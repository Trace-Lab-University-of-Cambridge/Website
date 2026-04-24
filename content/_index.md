---
title:
date: 2024-01-01
type: landing

sections:
  # Hero - Full screen with background
  - block: markdown
    content:
      title:
      subtitle:
      text: |
        <div class="hero-fullscreen">
          <img src="media/trace-logo-white.svg" alt="TRACE Lab" class="hero-logo">
          <p class="hero-subtitle">Trustworthy Artificial Intelligence Laboratory</p>
          <p class="hero-university">University of Cambridge</p>
        </div>
    design:
      columns: '1'
      background:
        image:
          filename: hero-bg.jpg
          filters:
            brightness: 0.4
          parallax: false
          position: center top
          size: cover
        text_color_light: true
      spacing:
        padding: ["120px", "0", "120px", "0"]

  # About
  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div class="about-section">

        We build <b>TR</b>ustworthy <b>A</b>rtificial intelligen<b>CE</b> systems for high-stakes settings like **healthcare**, **education**, and **public safety**. Drawing from machine learning, human-computer interaction, and social science, we investigate when and how AI can be trusted, integrated into decision-making, and evaluated in ecologically valid settings.

        </div>
    design:
      columns: '1'

  # Research
  - block: markdown
    id: research
    content:
      title: Research
      subtitle: ''
      text: |
        <div class="research-grid-five">
          <a href="https://deploymentof.ai" target="_blank" class="research-card">
            <div class="card-icon">○</div>
            <h3>Deployment as a Science</h3>
            <p>Systematic approaches to document how AI systems are deployed across diverse real-world contexts.</p>
          </a>
          <a href="https://externalis.ai" target="_blank" class="research-card">
            <div class="card-icon">□</div>
            <h3>Human-AI Externalities</h3>
            <p>Investigating the broader impacts of AI on individuals and society—both intended and unintended.</p>
          </a>
          <!-- HIDDEN: Affordances of AI Use
          <div class="research-card">
            <div class="card-icon">◇</div>
            <h3>Affordances of AI Use</h3>
            <p>Understanding how people perceive and interact with AI systems in daily life and work.</p>
          </div>
          -->
          <a href="https://tailorworkflow.com/" target="_blank" class="research-card research-card-triangle">
            <div class="card-icon">△</div>
            <h3>Agent Orchestration</h3>
            <p>Frameworks for deploying AI agents that work alongside humans in complex environments.</p>
          </a>
          <a href="publications/" class="research-card research-card-triangle">
            <div class="card-icon">▽</div>
            <h3>Trustworthy AI</h3>
            <p>Building AI systems that are reliable, fair, transparent, and aligned with human values.</p>
          </a>
        </div>
    design:
      columns: '1'

  # Team
  - block: markdown
    id: team
    content:
      title: Team
      subtitle: ''
      text: |
        <div class="team-grid">
          <!-- PI -->
          <div class="team-card"
               data-name="Umang Bhatt"
               data-role="Lab Director & Assistant Professor"
               data-org="University of Cambridge · CHIA · King's College"
               data-bio="Dr. Umang Bhatt is an Assistant Professor in Trustworthy Artificial Intelligence at the University of Cambridge and its Centre for Human-Inspired AI. He leads the TRACE Lab, focusing on building trustworthy AI systems for high-stakes settings like healthcare, education, and public safety."
               data-interests="Trustworthy AI,Human-AI Interaction,Machine Learning,Explainability"
               data-email="usb20@cam.ac.uk"
               data-website="https://umangsbhatt.github.io"
               data-scholar="https://scholar.google.com/citations?user=qq8bxPkAAAAJ&hl=en">
            <img class="team-avatar" src="media/team/umang-bhatt.jpg" alt="Umang Bhatt">
            <h3 class="team-name">Umang Bhatt</h3>
            <p class="team-role">PI, Assistant Professor</p>
            <p class="team-org">Cambridge · CHIA</p>
          </div>
          <!-- PhD Students -->
          <div class="team-card"
               data-name="Elaf Almahmoud"
               data-role="PhD Student (co-advised with Mateja Jamnik)"
               data-org="University of Cambridge"
               data-bio="Elaf is a PhD student with the TRACE lab researching AI systems and reasoning. Elaf formerly conducted research at the Center for Complex Systems in Riyadh and MIT in Cambridge, Massachusetts, and worked as a machine learning engineer at TAHAKOM. Elaf graduated from NYU with her Master's in Computer Science and from King Saud University with her Bachelor's degree in Computer Science."
               data-interests="AI Systems,Reasoning,Machine Learning">
            <img class="team-avatar" src="media/team/elaf-almahmoud.png" alt="Elaf Almahmoud">
            <h3 class="team-name">Elaf Almahmoud</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
            <a href="https://www.linkedin.com/in/elafalmahmoud/" target="_blank" rel="noopener" class="team-website-link" onclick="event.stopPropagation()">LinkedIn →</a>
          </div>
          <div class="team-card"
               data-name="Noah Broestl"
               data-role="PhD Student"
               data-org="University of Cambridge"
               data-bio="Noah is a PhD student with the TRACE lab working on aspects of trustworthy AI and machine learning. He is a partner at Boston Consulting Group, where he leads the firm's responsible AI practice. Prior to joining BCG, Noah spent nearly 15 years working at Google after serving as an Intelligence Analyst with the U.S. Air Force. Noah graduated with distinction from the University of Oxford with his Master's degree in practical ethics and from Colorado State University with his Bachelor's degree in Sociology and Diversity in Law and Liberal Arts and History."
               data-interests="Trustworthy AI,Machine Learning,Responsible AI">
            <img class="team-avatar" src="media/team/noah-broestl.jpeg" alt="Noah Broestl">
            <h3 class="team-name">Noah Broestl</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Drew Calcagno"
               data-role="PhD Student"
               data-org="University of Cambridge"
               data-bio="Drew is a PhD student with the TRACE lab researching trustworthy AI deployment and human-AI interaction in high-stakes domains. Previously, Drew worked at Google Research, focusing on strategic narratives for artificial intelligence and quantum computing. He's a former government official and Naval officer, having served at the White House, at the Pentagon, and on a forward-deployed warship. At those posts, he wrote artificial intelligence policy for the Chief Technology Officer of the U.S. and managed machine learning programs for the Undersecretary of Defense for Intelligence. A Boston native, he graduated from the University of Oxford as a Rotary Scholar, the University of London - SOAS as a Fulbright Scholar, and the U.S. Naval Academy with distinction."
               data-interests="AI Deployment,Human-AI Interaction,Trustworthy ML"
               data-website="https://drewcalcagno.com/">
            <img class="team-avatar" src="media/team/drew-calcagno.png" alt="Drew Calcagno">
            <h3 class="team-name">Drew Calcagno</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Bernardo Villegas"
               data-role="PhD Student (co-advised with Anna Korhonen)"
               data-org="University of Cambridge"
               data-bio="Bernardo is a PhD student with the TRACE lab researching trustworthy AI systems. He focuses on the intersection of AI research, social science, and tech development and draws from his background in sociology. From Ecuador, Bernardo graduated from Pontifical Catholic University of Ecuador with a degree in Sociology and from the University of Edinburgh with his Master's degree in Data Science with distinction."
               data-interests="Trustworthy AI,NLP,Social Science"
               data-website="https://bjv01.github.io">
            <img class="team-avatar" src="media/team/bernardo-villegas.png" alt="Bernardo Villegas">
            <h3 class="team-name">Bernardo Villegas</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Yung-Hsuan Wu"
               data-role="Research Assistant"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/yung-hsuan-wu.png" alt="Yung-Hsuan Wu">
            <h3 class="team-name">Yung-Hsuan Wu</h3>
            <p class="team-role">Research Assistant</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Olivia Slack"
               data-role="Lab Manager"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Lab Operations,Research Administration">
            <img class="team-avatar" src="media/team/olivia-slack.jpg" alt="Olivia Slack">
            <h3 class="team-name">Olivia Slack</h3>
            <p class="team-role">Lab Manager</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Kostadin Devedzhiev"
               data-role="Masters Student"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/kostadin-devedzhiev.jpg" alt="Kostadin Devedzhiev">
            <h3 class="team-name">Kostadin Devedzhiev</h3>
            <p class="team-role">Masters Student</p>
            <p class="team-org">Cambridge</p>
            <a href="https://kostadindev.github.io/" target="_blank" rel="noopener" class="team-website-link" onclick="event.stopPropagation()">Website →</a>
          </div>
          <div class="team-card"
               data-name="Afan Handoyo"
               data-role="Masters Student"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/afan-handoyo.png" alt="Afan Handoyo">
            <h3 class="team-name">Afan Handoyo</h3>
            <p class="team-role">Masters Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Shin Zert Phua"
               data-role="Masters Student"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/shin-zert-phua.png" alt="Shin Zert Phua">
            <h3 class="team-name">Shin Zert Phua</h3>
            <p class="team-role">Masters Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Juan Pablo Ruiz"
               data-role="Masters Student"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/juan-pablo-ruiz.jpeg" alt="Juan Pablo Ruiz">
            <h3 class="team-name">Juan Pablo Ruiz</h3>
            <p class="team-role">Masters Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Ariella Shulman"
               data-role="Masters Student"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/ariella-shulman.png" alt="Ariella Shulman">
            <h3 class="team-name">Ariella Shulman</h3>
            <p class="team-role">Masters Student</p>
            <p class="team-org">Cambridge</p>
          </div>
          <div class="team-card"
               data-name="Joy Wang"
               data-role="Masters Student"
               data-org="University of Cambridge"
               data-bio="Bio coming soon."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="media/team/joy-wang.jpg" alt="Joy Wang">
            <h3 class="team-name">Joy Wang</h3>
            <p class="team-role">Masters Student</p>
            <p class="team-org">Cambridge</p>
          </div>
        </div>

        <h3 class="affiliated-title">Affiliated Students</h3>
        <div class="affiliated-grid">
          <div class="affiliated-card">
            <div class="affiliated-name">Hamza Alshamy</div>
            <div class="affiliated-org">NYU</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Mihir Upadhyay</div>
            <div class="affiliated-org">NYU</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Hannah Liu</div>
            <div class="affiliated-org">Imperial</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Hassan Suliman</div>
            <div class="affiliated-org">AIMS</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Dagmawi Misker</div>
            <div class="affiliated-org">AIMS</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Ghaida Ibrahim</div>
            <div class="affiliated-org">AIMS</div>
          </div>
        </div>

        <h3 class="affiliated-title">Friends of TRACE</h3>
        <div class="affiliated-grid">
          <div class="affiliated-card">
            <div class="affiliated-name">Adrian Weller</div>
            <div class="affiliated-org">University of Cambridge</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Katie Collins</div>
            <div class="affiliated-org">MIT</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Mateja Jamnik</div>
            <div class="affiliated-org">University of Cambridge</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Francesco Quinzan</div>
            <div class="affiliated-org">University of Oxford</div>
          </div>
          <div class="affiliated-card">
            <div class="affiliated-name">Ilia Sucholutsky</div>
            <div class="affiliated-org">Purdue University</div>
          </div>
        </div>

        <script>
        document.addEventListener('DOMContentLoaded', function() {
          const teamCards = document.querySelectorAll('.team-card');

          teamCards.forEach(card => {
            const website = card.dataset.website || '';
            if (website) {
              card.classList.add('has-website');
              card.addEventListener('click', function() {
                window.open(website, '_blank');
              });
            }
          });
        });
        </script>
    design:
      columns: '1'

  # Publications
  - block: markdown
    id: publications
    content:
      title: Recent Publications
      subtitle: ''
      text: |
        <div class="pub-grid-five">
          <a href="https://arxiv.org/abs/2404.12994" target="_blank" rel="noopener" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>Rethinking the Evaluation of Dialogue Systems</h3>
            <p class="pub-authors">Siro, C., et al.</p>
            <p class="pub-description">How user feedback influences dialogue system evaluation, with crowdworkers showing greater sensitivity to feedback on usefulness and interestingness.</p>
            <p class="pub-venue">SIGIR 2024</p>
          </a>
          <a href="https://www.nature.com/articles/s41562-024-01991-9" target="_blank" rel="noopener" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>Building Machines that Think with People</h3>
            <p class="pub-authors">Collins, K., et al.</p>
            <p class="pub-description">A vision for human-AI collaboration leveraging complementary strengths of cognition and machine learning.</p>
            <p class="pub-venue">Nature Human Behavior</p>
          </a>
          <a href="https://ojs.aaai.org/index.php/AAAI/article/view/33555" target="_blank" rel="noopener" class="pub-card">
            <span class="pub-year">2025</span>
            <h3>Personalized Decision Support Policies</h3>
            <p class="pub-authors">Bhatt, U., et al.</p>
            <p class="pub-description">Learning decision support policies that adapt to individual users, improving team performance.</p>
            <p class="pub-venue">AAAI 2025</p>
          </a>
        </div>
        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="publications/" class="view-all-link">View all publications →</a>
        </div>
    design:
      columns: '1'

  # News
  - block: markdown
    id: news
    content:
      title: News
      subtitle: ''
      text: |
        <div class="news-section">
          <div class="news-item">
            <span class="news-date">April 2025</span>
            <p><strong>Umang</strong> taught a three-week course on Responsible AI at the African Institute for Mathematical Sciences (AIMS) in Cape Town, South Africa. Three AIMS students — Hassan Suliman, Dagmawi Misker, and Ghaida Ibrahim — are now joining the lab as affiliated researchers. Read more on <a href="https://www.linkedin.com/feed/update/urn:li:activity:7451985562170953729" target="_blank" rel="noopener">LinkedIn</a>.</p>
          </div>
          <div class="news-item">
            <span class="news-date">March 2025</span>
            <p>The hidden costs of agentic AI: humans recruited to sense the physical world on an agent's behalf, potentially without their consent. We're all sensors. <strong>Umang</strong> explores this in <a href="https://www.noemamag.com/ai-agents-are-recruiting-humans-to-observe-the-offline-world/" target="_blank" rel="noopener">Noema Magazine</a> and on <a href="https://substack.com/home/post/p-190493542" target="_blank" rel="noopener">Substack</a>.</p>
          </div>
          <div class="news-item">
            <span class="news-date">February 2025</span>
            <p><strong>Umang</strong> and <strong>Ariella</strong> will represent the University of Cambridge at the <a href="https://impact.indiaai.gov.in" target="_blank" rel="noopener">India AI Impact Summit 2026</a>.</p>
          </div>
        </div>
    design:
      columns: '1'

  # Our Supporters
  - block: markdown
    content:
      title: Our Supporters
      subtitle: ''
      text: |
        <div class="supporters-section">
          <h3 class="affiliated-title">Industry Partners</h3>
          <div class="affiliations-row supporters-row">
            <a href="https://www.aisi.gov.uk/" target="_blank">
              <img src="media/logos/aisi.svg" alt="AI Safety Institute UK">
            </a>
            <a href="https://www.nhs.uk/" target="_blank">
              <img src="media/logos/nhs.svg" alt="NHS">
            </a>
            <a href="https://www.responsible.ai/" target="_blank">
              <img src="media/logos/raii.png" alt="Responsible AI Institute">
            </a>
            <a href="https://www.accenture.com/" target="_blank">
              <img src="media/logos/accenture.svg" alt="Accenture">
            </a>
          </div>
          <h3 class="affiliated-title">Global Academic Partners</h3>
          <div class="affiliations-row supporters-row">
            <a href="https://mbzuai.ac.ae/" target="_blank">
              <img src="media/logos/mbzuai.png" alt="Mohamed Bin Zayed University of Artificial Intelligence">
            </a>
            <a href="https://aims.ac.rw/" target="_blank">
              <img src="media/logos/aims.png" alt="African Institute for Mathematical Sciences">
            </a>
            <a href="https://www.udla.edu.ec/" target="_blank">
              <img src="media/logos/udla.png" alt="Universidad de las Américas" class="udla-logo">
            </a>
          </div>
        </div>
    design:
      columns: '1'

  # Affiliations
  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div class="affiliations-row affiliations-bottom">
          <a href="https://www.cam.ac.uk/" target="_blank">
            <img src="media/cambridge-logo.png" alt="University of Cambridge">
          </a>
          <a href="https://www.chia.cam.ac.uk/" target="_blank">
            <img src="media/chia-logo.png" alt="CHIA">
          </a>
          <a href="https://www.kings.cam.ac.uk/" target="_blank" class="kings-logo">
            <img src="media/logos/kings.webp" alt="King's College Cambridge">
          </a>
        </div>
    design:
      columns: '1'
---
