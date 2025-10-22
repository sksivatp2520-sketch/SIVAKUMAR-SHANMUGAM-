<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>
ssvt_transport_app/
│
├── android/                 # Native Android project files (Gradle, manifests)
├── ios/                     # Native iOS project files
├── assets/                  # Static files like icons, images, fonts
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── lib/                     # Flutter main directory (or src/ for React)
│   ├── main.dart            # App entry point (index.js for React)
│   ├── core/                # Global utilities, constants, and theme
│   │   ├── constants.dart
│   │   ├── theme.dart
│   │   └── helpers.dart
│   │
│   ├── data/                # Data layer for APIs, local storage
│   │   ├── models/
│   │   │   ├── user_model.dart
│   │   │   ├── trip_model.dart
│   │   │   └── payment_model.dart
│   │   ├── services/
│   │   │   ├── api_service.dart
│   │   │   └── database_service.dart
│   │   └── repositories/
│   │       └── transport_repository.dart
│   │
│   ├── ui/                  # User Interface components and pages
│   │   ├── screens/
│   │   │   ├── login_screen.dart
│   │   │   ├── dashboard_screen.dart
│   │   │   ├── load_booking_screen.dart
│   │   │   ├── payments_screen.dart
│   │   │   └── profile_screen.dart
│   │   ├── widgets/
│   │   │   ├── button_widget.dart
│   │   │   ├── card_widget.dart
│   │   │   └── form_field_widget.dart
│   │   └── styles/
│   │       └── app_styles.dart
│   │
│   └── controllers/         # Business logic controllers (MVC pattern)
│       ├── auth_controller.dart
│       ├── load_controller.dart
│       ├── trip_controller.dart
│       └── payment_controller.dart
│
├── pubspec.yaml  backend/
│
├── src/
│   ├── app.ts               # Main server entry
│   ├── config/              # Environment and DB configurations
│   │   ├── env.ts
│   │   └── db.ts
│   ├── models/              # Mongoose or ORM models
│   │   ├── User.ts
│   │   ├── Trip.ts
│   │   └── Payment.ts
│   ├── controllers/         # Business logic and route handling
│   │   ├── AuthController.ts
│   │   ├── TripController.ts
│   │   └── PaymentController.ts
│   ├── routes/              # Express route definitions
│   │   ├── auth.routes.ts
│   │   ├── trips.routes.ts
│   │   └── payments.routes.ts
│   ├── middleware/          # Auth, logging, request validation
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── utils/               # Helper functions, constants, app logic support
│   │   └── responseHandler.ts
│   └── services/            # External API connections (UPI, GPS, etc.)
│       ├── walletService.ts
│       └── notificationService.ts
│
├── package.json             # Node.js dependencies
└── tsconfig.json            # TypeScript config           # Flutter dependencies (package.json for React)
└── README.md
# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1FH2LCkK_aGE7TeMWsS9PSQhe39anFpKD

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
