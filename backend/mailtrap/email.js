import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTEmplates.js";

export const sendVerificationEmail = async (email, verificationToken) =>  {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
            verificationToken
            ),
            category: "Email Verification"
        });

        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send verification email to ${email} - ${error.message}  `);
    }
} 

export const sendWelcomeEmail = async (name,email) =>  {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "f6494864-7e27-4be2-98bf-aa2a81064611",
            template_variables : {
                company_info_name: "Auth Company",
                name: name
            }
        })

        console.log("Welcome Email sent successfully:", response);
      } catch (error) {
        console.error("Error sending email:", error); 
        throw new Error(`Failed to send welcome email to ${email} - ${error.message}  `);  
    }

}
export const sendPasswordResetEmail = async (email, resetURL) =>  {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
                "{resetURL}", resetURL
            ),
            category: "Password Reset"
        });

        console.log("Email sent successfully:", response);
    } catch (error) {    
        console.error("Error sending email:", error);
        throw new Error(`Failed to send password reset email to ${email} - ${error.message}  `);
    }
}
//sendResetSuccessful
export const sendResetSuccessfulEmail = async (email) =>  {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("Password Reset Email sent successfully:", response);
      } catch (error) {
        console.error("Error sending email:", error);    
        throw new Error(`Failed to send password reset successful email to ${email} - ${error.message}  `);
    }
}