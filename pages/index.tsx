import Hero from "../components/hero";
import ClubInfo from "../components/club-info";
import Gallery from "../components/gallery";
import Footer from "../components/footer";

const About = () => {
    return <main>
        <section>
            <Hero />
        </section>
        <section>
            <ClubInfo />
        </section>
        <section>
            <Gallery />
        </section>
        <Footer />
    </main>
}

export default About;