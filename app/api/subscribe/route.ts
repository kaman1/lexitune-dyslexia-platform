// import { stripe } from '../stripe';
// import { NextRequest, NextResponse } from 'next/server';
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "@/convex/_generated/api";

// // Initialize Convex client for server-side calls
// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

// export const POST = async (req: NextRequest) => {
//   const { userId, orgName, subscriptionLevel } = await req.json();

//   try {
//     // Create organization in your database (Convex)
//     const organization = await convex.mutation(api.organizations.create, {
//       name: orgName,
//       // Add other organization fields as needed
//     });

//     // Add user to organization
//     await convex.mutation(api.organizations.addMember, {
//       organizationId: organization._id,
//       userId,
//       role: 'admin',
//     });

//     // Retrieve price ID from Stripe
//     // The Stripe look up key for the price *must* be the same as the subscription level string
//     let price;

//     try {
//       price = await stripe.prices.list({
//         lookup_keys: [subscriptionLevel],
//       });
//     } catch (error) {
//       console.error(
//         'Error retrieving price from Stripe. This is likely because the products and prices have not been created yet. Run the setup script `pnpm run setup` to automatically create them.',
//         error,
//       );
//       return NextResponse.json({ error: 'Error retrieving price from Stripe' }, { status: 500 });
//     }

//     // Get user from your database
//     const user = await convex.query(api.users.getById, { userId });
    
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Create Stripe customer
//     const customer = await stripe.customers.create({
//       email: user.email,
//       metadata: {
//         organizationId: organization._id,
//       },
//     });

//     // Update organization with Stripe customer ID
//     await convex.mutation(api.organizations.update, {
//       id: organization._id,
//       stripeCustomerId: customer.id,
//     });

//     const session = await stripe.checkout.sessions.create({
//       customer: customer.id,
//       billing_address_collection: 'auto',
//       line_items: [
//         {
//           price: price.data[0].id,
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'An error occurred';
//     console.error(errorMessage, error);
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
import { type NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
export const POST = async (req: NextRequest) => {
  const { userId, orgName, subscriptionLevel } = await req.json();

  console.log(userId, orgName, subscriptionLevel);
  return NextResponse.json({ message: 'Subscription created' });

};