# 🚀 Guide d'intégration Laravel pour Marck

## 📚 Structure recommandée

```bash
app/
├── Http/
│   ├── Controllers/
│   │   ├── VoiceController.php       # Gestion des commandes vocales
│   │   ├── CourseController.php      # Gestion des cours
│   │   └── HomeworkController.php    # Gestion des devoirs
│   │
│   ├── Middleware/
│   │   └── WebSocketAuth.php         # Authentification WebSocket
│   │
│   └── Resources/
│       └── VoiceResource.php         # Transformation des données vocales
│
├── Services/
│   ├── VoiceRecognitionService.php   # Service de reconnaissance vocale
│   └── AIAssistantService.php        # Service d'assistance IA
│
└── WebSockets/
    └── VoiceWebSocketHandler.php     # Gestionnaire WebSocket
```

## 🔑 Points clés d'implémentation

1. **Authentication avec Sanctum**
```php
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

2. **WebSockets avec Laravel WebSockets**
```php
composer require beyondcode/laravel-websockets
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="config"
```

3. **Cache avec Redis**
```php
composer require predis/predis
```

## 🎯 Exemples de code

### 1. Controller pour la reconnaissance vocale
```php
namespace App\Http\Controllers;

use App\Services\VoiceRecognitionService;
use Illuminate\Http\Request;

class VoiceController extends Controller
{
    public function __construct(
        private VoiceRecognitionService $voiceService
    ) {}

    public function processAudio(Request $request)
    {
        // Validation du chunk audio
        $request->validate([
            'audio' => 'required|file|mimes:wav,mp3'
        ]);

        // Traitement avec le service
        $result = $this->voiceService->processAudioChunk(
            $request->file('audio')
        );

        // Retour en temps réel via WebSocket
        broadcast(new VoiceProcessed($result))->toPrivateChannel(
            'voice.' . auth()->id()
        );

        return response()->json(['status' => 'processing']);
    }
}
```

### 2. Service de reconnaissance vocale
```php
namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Cache;

class VoiceRecognitionService
{
    public function processAudioChunk($audioFile)
    {
        // Cache avec Redis (15 minutes)
        $cacheKey = 'voice_' . md5($audioFile->get());
        
        return Cache::remember($cacheKey, 900, function () use ($audioFile) {
            // Utilisation de Whisper via OpenAI
            $response = OpenAI::audio()->transcribe([
                'model' => 'whisper-1',
                'file' => $audioFile,
                'language' => 'fr'
            ]);

            return $response->text;
        });
    }
}
```

### 3. WebSocket Handler
```php
namespace App\WebSockets;

use Ratchet\WebSocket\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class VoiceWebSocketHandler implements MessageComponentInterface
{
    protected $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg);
        
        // Gestion des chunks audio en temps réel
        if ($data->type === 'audio_chunk') {
            // Traitement asynchrone
            dispatch(new ProcessAudioChunk($data->audio));
        }
    }
}
```

## 🔄 Queues et Jobs

1. **Configuration dans .env**
```env
QUEUE_CONNECTION=redis
REDIS_CLIENT=predis
```

2. **Job pour le traitement audio**
```php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcessAudioChunk implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(private $audioData) {}

    public function handle(VoiceRecognitionService $service)
    {
        $result = $service->processAudioChunk($this->audioData);
        
        // Notification en temps réel
        broadcast(new AudioProcessed($result));
    }
}
```

## 📡 Events et Broadcasting

1. **Event pour les résultats vocaux**
```php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class VoiceProcessed implements ShouldBroadcast
{
    use InteractsWithSockets;

    public function __construct(public $result) {}

    public function broadcastOn()
    {
        return new PrivateChannel('voice.' . auth()->id());
    }
}
```

## 🔐 Sécurité

1. **Middleware WebSocket**
```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class WebSocketAuth
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
```

## 🚦 Routes API

```php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/voice/process', [VoiceController::class, 'processAudio']);
    Route::get('/voice/status', [VoiceController::class, 'status']);
});
```

## 📦 Packages recommandés

```json
{
    "require": {
        "laravel/sanctum": "^3.2",
        "beyondcode/laravel-websockets": "^1.14",
        "predis/predis": "^2.0",
        "openai-php/laravel": "^0.7",
        "spatie/laravel-permission": "^5.10"
    }
}
```

## 🎯 Prochaines étapes

1. Implémenter la gestion des erreurs
2. Ajouter des tests unitaires
3. Mettre en place le monitoring
4. Configurer le rate limiting
5. Optimiser les performances Redis

N'hésite pas si tu as des questions ! 🚀