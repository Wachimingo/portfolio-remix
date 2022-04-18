import { json, useLoaderData } from "remix";
import { CertCard, SkillCard } from "~/components/Card";
import { getSkills } from '~/controllers/skills';
import { getCategories } from '~/controllers/categories';
import rootStyles from '~/styles/root.css';
import { Link } from "remix";
import { FaArrowDown } from "react-icons/fa";
import { getCerts } from "~/controllers/certs";

export function links() {
  return [
    { rel: "stylesheet", href: rootStyles },
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
    <main className="main">
      <div className='welcome curve'>
        <h1 className="">Wachimingo</h1>
        <br />
        <p className="">Welcome</p>
        <img
          className="profilePic"
          src="https://media-exp1.licdn.com/dms/image/C4E03AQHzPruWkSCQiA/profile-displayphoto-shrink_800_800/0/1555775304131?e=1653523200&v=beta&t=mteZIG0Tts7K7TGudZRMAOSul0SFATk1pbEu8cJnwBU"
          alt="profile"
          loading="lazy"
        />
      </div>
      <div className="grid itemsContainer">
        {
          // eslint-disable-next-line array-callback-return
          categories.map((cat: any) => {
            if (cat.relatedTo === 'skills') {
              return (
                <section key={cat.name} className="">
                  <h3 className="">{cat.name}</h3>
                  {
                    skills.filter((skill: any) => skill.category === cat._id).map((item: any, i: number) => {
                      return (
                        <SkillCard key={i} index={i} item={item} />
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
      </div>

      <div className="grid certs">
        <div className="semicircle">
          <h3 className=''>Certifications</h3>
        </div>
        {
          certs.map((item: any, i: number) => {
            return (
              <CertCard key={i} index={i} item={item} />
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
      </div>
    </main>
  );
}
