protected $routeMiddleware = [
    // Middleware lainnya...
    'api' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
];
