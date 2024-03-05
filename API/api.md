# Algoritmi e Principi dell'Informatica

Un modello formale è un oggetto matematico, che ci permette di valutare un progetto, prima di realizzarlo.<br>
Il modello è *adeguato* se i risultati ottenuti riflettono le proprietà che si vogliono ottenere.<br>

3 fasi:
>Analisi dei Requisiti: documento di sepcifica<br>
>Progetto: architettura<br>
>Implementazione: codice

2 Tipi di Modelli: 
>Generali: il sistema informatico di un sistema piu ampio.<br>
>Flessibili: spesso non esiste il "modello gia pronto" occorre saper adattare modelli esistenti ad esigenze specifiche e impreviste<br>


# Il Linguaggio
Un linguaggio puo essere un linguaggio naturale come una lingua parlata oppure, uno artificiale come un linguaggio di programmazione.

## Gli elementi di un linguaggio

#### Alfabeto o Vocabolario

Logicamente si puo associare al vocabolario di una lingua naturale, matematicamente è un insieme finito di simboli base. 

#### Stringa

Sequenza ordinata e finita di elementi di A (un alfabeto), anche con ripetizioni. La stringa nulla è $\varepsilon$. 
L'Insieme A* (star) è l'insieme di tutte le stringhe, inclusa $\varepsilon$, su A

##### Operazioni sulle Stringhe
1. Concatenazione (.) : date x='prima di scrivere una pagina' e y='si legge' $\rightarrow$ x.y = 'prima di scrivere una pagina si legge'<br>
la concatenazione è una proprietà associativa, non commutativa.<br>
###### "Conseguenze"
A* quindi possiamo descriverlo come *monoide libero* costruito su A mediante "." e chiamiamo
$\varepsilon$ elemento neutro rispetto "."

#### Linguaggio

L è sottoinsieme di $\text{A*}: \mathcal{L}\subseteq \text{A*}$, 

##### Operazioni sui linguaggi

1. Operazioni Insiemistiche: $\lor, \land, \text{L}_1, \text{-L}_2, \neg\text{L} = \text{A* - L}$ dove -L è il complemento di L, a volte indicato anche come $\overline{L}$ 
2. Concatenazione: $\text{L}_1. \text{L}_2$ = {x,y | x $\in \text{L}_1$, y $\in \text{L}_2$}<br>
Persi $\text{L}_1=\{0,1\}\text{* e L}_2=\{a,b\}\text{*} \rightarrow \text{L}_1.\text{L}_2 = \{\varepsilon,0,1,0a,11b,abb,10ba,...\}$ **non ab1**

####
Concludendo possiamo dire che il concetto di linguaggio e le operazioni base ad esso associate forniscono un mezzo espressivo estremamente generale per descrivere sistemi di ogni tipo, loro proprietà e problemi ad essi connessi. 

# Modelli Operazionali

macchine stratte baste sul concetto di stato di meccanismi per la sua evoluzione.<br>

Le macchine (automi) a stati finiti (FSA) sono costituiti da un insieme finito di stati Q, un insieme finito di ingressi I (alfabeto). Una funzione di transizione parziale $\delta: Q \times I \rightarrow Q$. L'automa puo essere visto come riconoscitore di linguaggi, partiamo dal fatto che un automa segue una sequenza di mosse che partono da uno *stato iniziale* ed è accettata se giunge in uno *stato finale* o di *accettazione*, quindi possiamo dire che un automa è capace di riconoscere un linguaggio dal momento che ne necessita la compressione per giungere a termine. 

# Analisi del Modello a Stati Finiti

È un modello semplice ed intuitivo, applicato in molteplici settori anche fuori dall'informatica. <br>
Una proprietà fondamentale di tali automi è il *comportamento ciclico* degli automi a stati finiti.<br>
In un FSA se è presente un ciclo che è percoribile almeno una volta, allora esso sarà percoribile anche 2,3,...,n volte.<br> 
Formalizando: $\text{Se x} \in \mathcal{L} \text{e} > |Q| \text{allora esistono } q\in Q\text{ e } w \in I^+ \text{ tali che : -x=ywz } \delta^*(q,w)=q \text{ inoltre } \forall n\geq 0, yw^n z \in \mathcal{L}$ questo algoritmo prende il nome di ***Pumping Lemma***. 

## Conseguenze del Pumping Lemma

ㄟ( ▔, ▔ )ㄏ

## Proprietà di chiusura degli FSA

In matematica, la chiusura di un insieme S consiste dei punti di aderenza di S, ripartiti in punti di accumulazione e punti isolati; intuitivamente, la chiusura è composta dai punti "vicini" a S. Un punto che si trova nella chiusura di S è un punto di chiusura di S. <u>La nozione di chiusura è in un certo senso duale alla nozione di parte interna.</u><br>

/*TO BE CONTINUED*/



# Modelli Descritivi

Tesi e formulare le proprieta desiderate o temute del sistema pittosto del suo funzionamento

### Differenze tra i due modelli

In realtà le differenze tra i due modelli non cosi' nette; piu' che altro si tratta di un utile riferimento nel classificare un tipo di modello. 

