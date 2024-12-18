// 🔌 WebSocket Manager - La connexion en temps réel
// -------------------------------------------
// Hocine, voici comment gérer proprement les WebSockets !

/**
 * 📡 CONFIGURATION WEBSOCKET
 * ------------------------
 * 1. Utilise ws ou socket.io côté serveur
 * 2. Gère la reconnexion automatique
 * 3. Implémente un système de retry avec backoff exponentiel
 */

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private url: string) {
    this.connect();
  }

  private connect() {
    try {
      this.ws = new WebSocket(this.url);
      this.setupListeners();
    } catch (error) {
      console.error('Erreur de connexion WebSocket:', error);
      this.handleReconnect();
    }
  }

  private setupListeners() {
    if (!this.ws) return;

    // Quand la connexion est établie (youpi! 🎉)
    this.ws.onopen = () => {
      console.log('WebSocket connecté!');
      this.reconnectAttempts = 0;
    };

    // Quand on reçoit un message (comme une lettre du facteur 📬)
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Erreur parsing message:', error);
      }
    };

    // Quand la connexion se ferme (oh non! 😢)
    this.ws.onclose = () => {
      console.log('WebSocket fermé');
      this.handleReconnect();
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Nombre maximum de tentatives de reconnexion atteint');
      return;
    }

    // Attente exponentielle entre les tentatives (comme un pro!)
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  private handleMessage(data: any) {
    // Implémente ta logique de traitement des messages ici
    // Par exemple:
    switch (data.type) {
      case 'VOICE_RESULT':
        // Traitement du résultat vocal
        break;
      case 'ERROR':
        // Gestion des erreurs
        break;
      default:
        console.log('Message non géré:', data);
    }
  }

  // Méthode pour envoyer des données (facile comme bonjour!)
  public send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket non connecté');
    }
  }

  // Fermeture propre de la connexion (toujours ranger sa chambre!)
  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}