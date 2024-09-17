import { StripeError, Token } from "@stripe/stripe-js";

export interface BillingFormType {
    isLoading: boolean;
    onSubmit: (
      storage: string,
      info: { token?: Token; error?: StripeError }
    ) => Promise<void>;
  }