# **App Name**: PharmaSwift

## Core Features:

- Role-Based User Authentication: Secure login and registration flows for Users, Medical Stores, Delivery Partners, and Admins, with user roles assigned and stored in Firestore for authorization.
- AI-Powered Prescription Analysis: A generative AI tool to assist medical stores by extracting key information (medicine names, dosage, instructions) from uploaded prescription images (stored in Firebase Storage) to streamline order processing.
- User Order Creation & Tracking: Users can upload prescription images, place new medicine orders, view current order status in real-time, and access their complete order history.
- Medical Store Order Fulfillment: Medical stores can view new incoming orders, accept or reject them based on availability, update medicine inventory, and manage order statuses within their dashboard.
- Delivery Partner Management: Delivery partners can receive and accept delivery requests, update real-time delivery status (e.g., 'Picked Up', 'Delivered'), and track their accumulated earnings.
- Admin Oversight Panel: A central admin dashboard to manage all users, registered medical stores, delivery partners, view all active and past orders, and monitor overall application activity.
- Real-time Notifications: Automated notifications sent to relevant users for significant order status changes, such as order placed, accepted by store, delivery started, and order completed.

## Style Guidelines:

- Primary color: A clear, calm blue (#4080BF) conveying reliability and professionalism, suitable for active elements and important headers.
- Background color: A very light, desaturated blue-grey (#EBF1F6) for a clean, hygienic, and inviting user interface, ensuring excellent readability.
- Accent color: A vibrant cyan (#4BD2D2) to highlight calls-to-action, provide visual feedback, and draw attention to new information, creating a harmonious contrast.
- The 'Inter' sans-serif typeface will be used consistently for all text elements. Its modern, objective aesthetic ensures excellent readability across various screen sizes and text densities, suitable for both headlines and body copy.
- Use modern, clean line icons that clearly represent their function. Icons should be easily understandable and contribute to intuitive navigation without clutter.
- Adopt a card-based layout system for displaying lists of orders, stores, and users. Prioritize mobile-first design with clear spacing and consistent component placement for optimal user experience across devices.
- Implement subtle, functional animations for feedback on user interactions, such as order status updates, button clicks, and view transitions, ensuring a smooth and responsive feel without distraction.