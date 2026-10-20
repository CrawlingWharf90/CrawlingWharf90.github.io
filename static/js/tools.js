class CrawlingTools {
  //* --- ALERT MODAL SYSTEM ---
  //? Only one alert is "active" at a time. State is shared by every call.
  static #current = null; // { modal, request, closing, previous }
  static #queue = []; // requests waiting for their turn
  static #background = null; // one shared backdrop for the whole alert session
  static #keyHandler = null; // one shared Backspace/Delete handler

  /**
   * Displays an alert modal.
   *
   * If an alert without a close callback is active, the new alert replaces it
   * after its entrance animation completes. If the active alert has a close
   * callback, or another alert is already queued, the new alert is queued and
   * displayed after the active alert is confirmed.
   *
   * @param {string} message - The message to display in the alert.
   * @param {Function|null} [onClose=null] - Optional callback invoked when the
   *   user confirms the alert.
   * @returns {void}
   */
  static alertModal(message, onClose = null) {
    const request = {
      message,
      onClose: typeof onClose === "function" ? onClose : null,
    };

    const cur = CrawlingTools.#current;

    if (!cur) {
      CrawlingTools.#showAlert(request);
    } else if (
      cur.closing ||
      cur.request.onClose ||
      CrawlingTools.#queue.length > 0
    ) {
      //! Must be confirmed by the user first (or something is already waiting): queue it
      CrawlingTools.#queue.push(request);
    } else {
      //? Active alert has no action: replace it
      CrawlingTools.#showAlert(request, cur);
    }
  }

  static #showAlert(request, previous = null) {
    const modal = document.createElement("div");
    modal.id = "alert-modal";
    modal.classList.add("alert-modal");
    modal.innerHTML = `
            <div class="alert-modal-content">
                <p></p>
                <div class="mt-3">
                    <button class="alert-ok-btn" id="alert-ok-btn">OK</button>
                    <div class="text-muted mt-2" style="font-size: 0.8rem;">or press <b>Backspace / Del</b></div>
                </div>
            </div>
        `;

    // Inject message
    modal.querySelector(".alert-modal-content p").innerHTML = request.message;
    modal
      .querySelector(".alert-ok-btn")
      .addEventListener("click", () => CrawlingTools.#closeCurrent());

    //? Shared backdrop (created once, kept alive while alerts are replacing / queueing)
    if (!CrawlingTools.#background) {
      const bg = document.createElement("div");
      bg.classList.add("alert-modal-background");
      document.body.appendChild(bg);
      CrawlingTools.#background = bg;
    }

    //? Shared key handler
    if (!CrawlingTools.#keyHandler) {
      CrawlingTools.#keyHandler = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault(); // Stop it from deleting text in the background
          CrawlingTools.#closeCurrent();
        }
      };
      document.addEventListener("keydown", CrawlingTools.#keyHandler);
    }

    //? The old modal gives up its id so getElementById("alert-modal") finds the new one
    if (previous) previous.modal.removeAttribute("id");

    const state = { modal, request, closing: false, previous };
    CrawlingTools.#current = state;
    document.body.appendChild(modal);

    CrawlingTools.#whenSettled(modal).then(() => {
      //? Entrance finished -> auto-confirm the previous alert (it had no action)
      if (state.previous) {
        state.previous.modal.remove();
        state.previous = null;
      }

      //? If this alert also has no action and others are waiting, let the next one replace it
      if (
        CrawlingTools.#current === state &&
        !state.closing &&
        !request.onClose &&
        CrawlingTools.#queue.length > 0
      ) {
        CrawlingTools.#showAlert(CrawlingTools.#queue.shift(), state);
      }
    });
  }

  static #closeCurrent() {
    const state = CrawlingTools.#current;
    if (!state || state.closing) return;
    state.closing = true;

    //? Closed before the replacement animation finished: drop the old one right away
    if (state.previous) {
      state.previous.modal.remove();
      state.previous = null;
    }

    const modal = state.modal;
    modal.style.top = window.innerHeight + modal.offsetHeight + "px";
    const duration =
      (parseFloat(getComputedStyle(modal).transitionDuration) || 0) * 1000;

    //? Fire the close action (an alertModal() call inside it is queued, since we're closing)
    if (state.request.onClose) {
      try {
        state.request.onClose();
      } catch (err) {
        console.error("alertModal onClose failed:", err);
      }
    }

    setTimeout(() => {
      modal.remove();
      if (CrawlingTools.#current === state) CrawlingTools.#current = null;

      const next = CrawlingTools.#queue.shift();
      if (next) {
        CrawlingTools.#showAlert(next);
      } else {
        //? Nothing left: tear down the shared backdrop and key handler
        if (CrawlingTools.#background) {
          CrawlingTools.#background.remove();
          CrawlingTools.#background = null;
        }
        if (CrawlingTools.#keyHandler) {
          document.removeEventListener("keydown", CrawlingTools.#keyHandler);
          CrawlingTools.#keyHandler = null;
        }
      }
    }, duration);
  }

  //? Resolves once the element's entrance animation/transition should be done
  static #whenSettled(el) {
    const cs = getComputedStyle(el);
    const list = (v) => v.split(",").map((s) => parseFloat(s) || 0);
    const total = (dur, del) => Math.max(...list(dur)) + Math.max(...list(del));

    const ms =
      Math.max(
        total(cs.animationDuration, cs.animationDelay),
        total(cs.transitionDuration, cs.transitionDelay),
      ) * 1000;

    return new Promise((resolve) => setTimeout(resolve, ms + 50));
  }

  static openImage(target, stopNewTab = false) {
    // 1. Normalize the input into an array of elements
    let images = [];
    if (typeof target === "string") {
      images = Array.from(document.querySelectorAll(target));
    } else if (target instanceof NodeList || Array.isArray(target)) {
      images = Array.from(target);
    } else if (target instanceof HTMLElement) {
      images = [target];
    }

    // 2. Apply to every image found
    images.forEach((imgElement) => {
      // Prevent right-click on the original image if requested
      if (stopNewTab) {
        imgElement.addEventListener("contextmenu", (e) => e.preventDefault());
      }

      imgElement.classList.add("crawling-zoomable");

      imgElement.addEventListener("click", () => {
        if (document.querySelector(".crawling-image-overlay")) return; //! Prevent multiple overlays
        const overlay = document.createElement("div");
        overlay.classList.add("crawling-image-overlay");

        const enlargedImg = document.createElement("img");
        enlargedImg.src = imgElement.src;
        enlargedImg.classList.add("crawling-enlarged-img");

        // Prevent right-click on the enlarged image if requested
        if (stopNewTab) {
          enlargedImg.addEventListener("contextmenu", (e) =>
            e.preventDefault(),
          );
        }

        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
          void overlay.offsetWidth;
          overlay.classList.add("active");
        });

        overlay.addEventListener("click", () => {
          overlay.classList.remove("active");

          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay);
            }
          }, 300);
        });
      });
    });
  }
}

export { CrawlingTools };
