import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import projImg6 from "../assets/img/project-img6.png";
/*digital art import*/
import projImg7 from "../assets/img/project-img7.png";
import projImg8 from "../assets/img/project-img8.png";
import projImg9 from "../assets/img/project-img9.png";
import projImg10 from "../assets/img/project-img10.png";
import projImg11 from "../assets/img/project-img11.png";
import projImg12 from "../assets/img/project-img12.png";
/*Other import*/
import projImg13 from "../assets/img/project-img13.png";
import projImg14 from "../assets/img/project-img14.png";
import projImg15 from "../assets/img/project-img15.png";
import projImg16 from "../assets/img/project-img16.png";
import projImg17 from "../assets/img/project-img17.png";
import projImg18 from "../assets/img/project-img18.png";

import colorSharp2 from "../assets/img/color-sharp2.png";

export const Projects = () => {

    const threeDprojects = [
        {
            title: "Bathroom Blender Render",
            description: "3D Interior Design",
            imgUrl: projImg1,
          },
          {
            title: "Salon Blender Render",
            description: "3D Interior Design",
            imgUrl: projImg2,
          },
          {
            title: "Planets Crash",
            description: "3D Animation",
            imgUrl: projImg3,
          },
          {
            title: "Realistic Leaf",
            description: "3D Realitic Leaf Nodes and Textures",
            imgUrl: projImg4,
          },
          {
            title: "Realistic Ring Render",
            description: "3D Metal & Node Effects Study",
            imgUrl: projImg5,
          },
          {
            title: "Realistic 3D Render and Animation",
            description: "Fabric Animation Study",
            imgUrl: projImg6,
          },
    ];

    const DigitalArt = [
        {
            title: "Digital Fanart",
            description: "Black Clover Fanart",
            imgUrl: projImg7,
          },
          {
            title: "Digital Fanart",
            description: "Made In Abyss Fanart",
            imgUrl: projImg8,
          },
          {
            title: "Game Character Design",
            description: "Original Character Design With Animation",
            imgUrl: projImg9,
          },
          {
            title: "Game Character Design",
            description: "Platformer Game Character Design",
            imgUrl: projImg10,
          },
          {
            title: "Digital Art Portrait",
            description: "Instagram Model Portrait",
            imgUrl: projImg11,
          },
          {
            title: "Digital Fanart",
            description: "My Hero Academia Fanart",
            imgUrl: projImg12,
          },
    ];

    const otherProjects = [
      {
          title: "Web Dev",
          description: "Anime Bio Page Design",
          imgUrl: projImg13,
        },
        {
          title: "Web Dev",
          description: "Anime Website Front Page Design",
          imgUrl: projImg14,
        },
        {
          title: "Game Dev",
          description: "Playable Top-down Demo on Unity",
          imgUrl: projImg15,
        },
        {
          title: "Game Dev",
          description: "Playable Platformer Demo on Unity",
          imgUrl: projImg16,
        },
        {
          title: "Game Assets Creation",
          description: "Top-Down Game tiles Creation",
          imgUrl: projImg17,
        },
        {
          title: "Retro Rpg Games Pixel Art",
          description: "Pixel Art Rpg Game World Atlas",
          imgUrl: projImg18,
        },
  ];

    return (
      <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                    <p>
                    Here is a bunch of projects that I've worked on! either 3D Design, Digital Drawing Or Web/Game dev related stuff.
                    </p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">3D Renders</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Digital Art</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Other</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                    <Row>
                    {
                          threeDprojects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                    </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="second">
                    <Row>
                    {
                          DigitalArt.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                    </Row>
                    </Tab.Pane>

                    <Tab.Pane eventKey="third">
                    <Row>
                    {
                          otherProjects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                    </Row>
                    </Tab.Pane>

                  </Tab.Content>
                    </Tab.Container>
                    </div>}</TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>
    )

}