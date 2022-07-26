import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Card } from "~/components";
import { getSkills } from '~/controllers/skills';
import { getCategories } from '~/controllers/categories';
import rootStyles from '~/styles/root.css';
import cardStyle from '~/styles/card.css';
import { FaArrowDown } from "react-icons/fa";
import { getCerts } from "~/controllers/certs";

export const meta = () => {
  return {
    title: "Welcome",
    description:
      "Welcome to my portfolio",
  };
};

export function links() {
  return [
    { rel: "stylesheet", href: rootStyles },
    { rel: "stylesheet", href: cardStyle },
  ]
}

export const loader = async () => {
  const [categories, skills, certs] = await Promise.all([
    getCategories({
      locale: "en",
      relatedTo: 'skills',
      limit: 2
    }),
    getSkills({
      locale: "en"
    }),
    getCerts({
      locale: "en",
      limit: 3
    })
  ])
  return json({ categories, skills, certs });
};

export default function Index() {
  const { categories, skills, certs } = useLoaderData<any>();
  return (
    <main>
      <div className='welcome curve'>
        <h1 className="">Wachimingo</h1>
        <img
          className="profile-pic"
          src="./assets/profile/profile-pic.webp"
          alt="profile"
          loading="lazy"
        />
      </div>
      <div className="items-container">
        {
          // eslint-disable-next-line array-callback-return
          categories.map((cat: any) => {
            if (cat.relatedTo === 'skills') {
              return (
                <section key={cat.name}>
                  <h2 className="">{cat.name}</h2>
                  {
                    skills.filter((skill: any) => skill.category === cat._id).map((item: any, i: number) => {
                      return (
                        <Card key={i} index={i}>
                          <img
                            loading="lazy"
                            src={item.icon ? item.icon : './assets/skills/default.webp'}
                            alt={item.name}
                          />
                          <div>
                            <h3>{item.name}</h3>
                            <br />
                            <p>
                              {item.description}
                            </p>
                            <progress value={item.level} max="100"> {item.level}%</progress>
                          </div>
                        </Card>
                      )
                    })
                  }
                </section>
              )
            } else return undefined
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

        <section className="">
          <div className="semicircle">
            <h2 className=''>Certifications</h2>
          </div>
          {
            certs.map((item: any, i: number) => {
              return (
                <Card key={i} index={i}>
                  <img
                    src={item.icon ? item.icon : './assets/skills/default.webp'}
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                  <br />
                </Card>
              )
            })
          }
          <div className=''>
            <div className=''>
              <FaArrowDown />
            </div>
            <Link to={'/certs'} className='btn btn-outline-primary'>
              See More
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
