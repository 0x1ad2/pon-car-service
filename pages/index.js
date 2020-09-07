import useSWR from "swr";
import styles from "./app.module.css";

const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Index() {
  const { data, error } = useSWR(
    `{
		cars {
			id
			name
			year
			brand {
				name
				country
			}
		}
	}
	`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { cars } = data;

  return (
    <div className={styles.body}>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Exo:wght@300;700&display=swap');
      </style>
      <section id="cards-section" className={styles.cardsSection}>
        <div className={styles.centeredContainer}>
          <img
            src="https://uploads-ssl.webflow.com/5f5540ac9efdf1c122e87021/5f5542222fce8372071a84e6_logo_white_tall.18c021d2e72f.svg"
            loading="lazy"
            alt=""
          ></img>
          <h2>You&#x27;ve been selected!</h2>
          <p>Dear Pom Business Mobility member,</p>
          <p>
            Permanence of the stars birth hydrogen atoms preserve and cherish
            that pale blue dot shores of the cosmic ocean of brilliant
            syntheses? Radio telescope rings of Uranus bits of moving fluff a
            mote of dust suspended in a sunbeam are creatures of the cosmos
            radio telescope? Rig Veda paroxysm of global death concept of the
            number one the carbon in our apple pies concept of the number one a
            very small stage in a vast cosmic arena and billions upon billions
            upon billions upon billions upon billions upon billions upon
            billions.
          </p>
          <div className={styles.cardsGirdContainer}>
            {cars.map((car, i) => (
              <div>
                <div>
                  <img
                    src="https://uploads-ssl.webflow.com/5f5540ac9efdf1c122e87021/5f5542d5f8d7367a0d8207dc_car.svg"
                    alt=""
                    className={styles.cardsImage}
                  ></img>
                </div>
                <h3>
                  {car.brand.name} - {car.name}
                </h3>
                <p>
                  <strong>Brand: </strong>
                  {car.brand.name}
                  <br />
                  <strong>Year: </strong>
                  {car.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
