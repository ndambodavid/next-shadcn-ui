import { SignupFormSchema, FormState } from '@/lib/definitions'
import { success } from 'zod'

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        phone: formData.get('phone'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await mockApiCall()

        return {
            message: response.message,
            success: response.success,
        }
    } catch (err) {
        return {
            message: err instanceof Error ? err.message : "Something went wrong",
            success: false,
        }
    }
}

// ✅ Mock API call to simulate backend
  const mockApiCall = (): Promise<{ success: boolean; error?: string, message?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomly simulate success or failure
        const shouldFail = Math.random() < 0.2 // 30% chance of failure

        if (shouldFail) {
          resolve({ success: false, message: "Email already exists." })
        } else {
          resolve({ success: true, message: "Account created successfully! Please log in."})
        }
      }, 3000)
    })
  }