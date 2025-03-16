import React from "react";
import { Container , Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { LinkedIn, GitHub, Telegram, Facebook, Twitter, Instagram } from "@mui/icons-material";
import one from "./img/1.png";
import two from "./img/2.png";
import three from "./img/3.png";
import four from "./img/4.png";
import five from "./img/5.png";
import six from "./img/6.png";
const projects = [
  {
    name: "E-commerce (Exclusive) ",
    url: "https://e-commerce-web-app-wik5.onrender.com/",
    image:one},
  {
    name: "E-Commerce (Gebeya Market App)",
    url: "https://gebeyamarketapp.onrender.com/",
    image: two },
    {
    name: "Event Organizer (OwlEvents)",
    url: "https://owlevents.app/",
    image: three},
      {
    name: "Website (My Portifolio)",
    url: "https://portfolio-tolalemma.onrender.com/",
    image: four},
     {
    name: "Social Media (Tola Social)",
    url: "https://tolasocial-com.onrender.com/",
    image:five},
      {
    name: "CRM",
    url: "https://moe-crm-4y3a.onrender.com/",
    image: six },
];

const AboutPage = () => {

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" >
        I am a MERN/PERN stack developer with experience in React, Node.js, PostgreSQL, SQL, and MongoDB.
        Passionate about building scalable and efficient web applications. 
      </Typography>
      
      {/* Social Media Links */}
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 3 }}>
        {[
          { icon: <LinkedIn />, link: "https://www.linkedin.com/in/tolalemma/" },
          { icon: <GitHub />, link: "https://github.com/Tola-lemma" },
          { icon: <Telegram />, link: "https://t.me/tolalemma" },
          { icon: <Facebook />, link: "https://m.facebook.com/m.tolalemma" },
          { icon: <Twitter />, link: "http://mobile.twitter.com/tolalemma" },
          { icon: <Instagram />, link: "https://www.instagram.com/tolalemma/" },
        ].map((item, index) => (
          <Grid item key={index}>
            <Tooltip title={item.link} arrow>
              <IconButton href={item.link} target="_blank" color="primary" size="large">
                {item.icon}
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      
      {/* Previous Work Section */}
      <Typography variant="h3" gutterBottom>
        My Previous Work
      </Typography>
      <Grid container  spacing={3} justifyContent="center">
        {projects.map((project, index) => (
          <Grid size={6} key={index} xs={12} sm={6} md={4}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ overflow: "hidden",width:"400px", transition: "transform 0.3s", '&:hover': { transform: "scale(1.2)" } }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{ width: "100%", height: "200px",  transition: "transform 0.3s", '&:hover': { transform: "scale(1.1)" } }}
                />
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {project.name}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutPage;
