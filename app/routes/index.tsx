import { SkillCard } from "~/components/Card";
import { json, useLoaderData } from "remix";
import { getSkills } from '../controllers/skills'
import { getCategories } from '../controllers/categories'
import cardStyles from '../styles/cards.css'
import { Link } from "remix";
import { FaArrowDown } from "react-icons/fa";
export function links() {
  return [
    { rel: "stylesheet", href: cardStyles },
    { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" },
    { rel: "script", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" },
    { rel: "script", href: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" },
  ]
}

export const loader = async () => {
  const [categories, skills] = await Promise.all([getCategories({ locale: "en" }), getSkills({ locale: "en" })])
  return json({ categories, skills });
};

export default function Index() {
  const { categories, skills } = useLoaderData<any>();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Navbar</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Link</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="#">Action</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" to="#" tabIndex={-1} aria-disabled="true">Disabled</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="grid">
        {
          // eslint-disable-next-line array-callback-return
          categories.map((cat: any) => {
            if (cat.relatedTo === 'skills') {
              return (
                <>
                  <section key={cat.name} className="">
                    <h3 className="text-xl">{cat.name}</h3>
                    {
                      skills.filter((skill: any) => skill.category === cat._id).map((item: any, i: number) => {
                        return (
                          <SkillCard key={i} item={item} />
                        )
                      })
                    }
                  </section>
                </>
              )
            } else <></>
          })
        }
        <div className=''>
          <div className=''>
            <FaArrowDown />
          </div>
          <Link to={'/skills'} className='btn btn-outline-primary'>
            See More
          </Link>
        </div>
      </div>
    </>
  );
}
