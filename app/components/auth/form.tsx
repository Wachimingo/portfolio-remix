/* eslint-disable react/display-name */
import { Form, Link } from "@remix-run/react";

const renderForm: any = {
    "signin": (action: string, title: string) => {
        return (
            <Form method="post" action='/auth/signin' className="dark form-width-90vw">
                <h1>{title}</h1>
                <p >Please enter your login and password!</p>
                <div>
                    <input
                        type="email"
                        name='email'
                        id="email"
                        required={true}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <p>Don't have an account? <Link to="/auth/signup">Sign Up</Link></p>
                </div>
                <div>
                    <input type="submit" value='Login' />
                </div>
            </Form>
        )
    },
    "signup": (action: string, title: string) => {
        return (
            <Form method="post" action='/auth/signup' className="dark form-width-90vw">
                <h2>{title}</h2>
                <p>Please enter your login and password!</p>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name='name'
                        id="name"
                        required={true}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        id="email"
                        required={true}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required={true}
                    />
                </div>
                <div>
                    <input type="submit" value='Sign Up' />
                </div>
            </Form>
        )
    },
    "confirmationEmailSent": (action: string) => {
        return (
            <div>
                <h1>Confirmation email sent.</h1>
            </div>
        )
    },
    "logout": (action: string, title: string) => {
        return (
            <div>
                <h2>{title}</h2>
                <h3>You've been logged off.</h3>
            </div>
        )
    }
}

export default (action: string) => {
    const title = action.charAt(0).toUpperCase() + action.slice(1);
    if (!action) return <>No action provided</>
    const handler = renderForm[action]
    if (!handler) return <>Not found</>
    return renderForm[action](action, title)
}