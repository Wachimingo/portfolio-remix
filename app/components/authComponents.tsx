import { Form } from "remix"

const renderForm: any = {
    "signin": (action: string) => {
        return (
            <Form method="post" action='/auth/signin' className="mb-md-5 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">{action}</h2>
                <p className="text-white-50">Please enter your login and password!</p>
                <div className="form-outline form-white">
                    <input
                        type="email"
                        name='email'
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        // value='joshuaguillen.adoc@live.com'
                    />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                </div>
                <div className="form-outline form-white">
                    <input
                        type="password"
                        name="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        // value='123456'
                    />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                </div>
                {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
            </Form>
        )
    },
    "signup": (action: string) => {
        return (
            <Form method="post" action='/auth/signup' className="md-5">
                <h2 className="fw-bold mb-2 text-uppercase">{action}</h2>
                <p className="text-white-50">Please enter your login and password!</p>
                <div className="form-outline form-white">
                    <label className="form-label" htmlFor="typeEmailX">Name</label>
                    <input
                        type="text"
                        name='name'
                        id="name"
                        className="form-control form-control-lg"
                    // value='test'
                    />
                </div>
                <div className="form-outline form-white">
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                    <input
                        type="email"
                        name='email'
                        id="typeEmailX"
                        className="form-control form-control-lg"
                    // value='alexanderguillen.adoc@gmail.com'
                    />
                </div>
                <div className="form-outline form-white">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                    // value='123456'
                    />
                </div>
                <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="typeConfrimPasswordX"
                        className="form-control form-control-lg"
                    // value='123456'
                    />
                </div>
                {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
            </Form>
        )
    },
    "signout": () => {
        return (
            <>You've been logged off.</>
        )
    }
}

export const authForm = (action: string) => {
    if (!action) return <>No action provided</>
    const handler = renderForm[action]
    if (!handler) return <>Not found</>
    return renderForm[action](action)
}
