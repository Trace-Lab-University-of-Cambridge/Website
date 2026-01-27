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
          <h1>TRACE Lab</h1>
          <p class="hero-tagline">Trustworthy AI for High-Stakes Decisions</p>
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
          position: center
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

        We build trustworthy AI systems for high-stakes settings like **healthcare**, **education**, and **public safety**. Drawing from machine learning, human-computer interaction, and social science, we investigate when and how AI can be trusted, integrated into decision-making, and evaluated in ecologically valid settings.

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
          <a href="project/deployment-as-a-science/" class="research-card">
            <div class="card-icon">○</div>
            <h3>Deployment as a Science</h3>
            <p>Systematic approaches to document how AI systems are deployed across diverse real-world contexts.</p>
          </a>
          <a href="project/externalities-human-ai/" class="research-card">
            <div class="card-icon">□</div>
            <h3>Human-AI Externalities</h3>
            <p>Investigating the broader impacts of AI on individuals and society—both intended and unintended.</p>
          </a>
          <a href="project/affordances-ai-use/" class="research-card">
            <div class="card-icon">◇</div>
            <h3>Affordances of AI Use</h3>
            <p>Understanding how people perceive and interact with AI systems in daily life and work.</p>
          </a>
          <a href="project/agent-orchestration/" class="research-card">
            <div class="card-icon">△</div>
            <h3>Agent Orchestration</h3>
            <p>Frameworks for deploying AI agents that work alongside humans in complex environments.</p>
          </a>
          <a href="publication/" class="research-card">
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
               data-email="ub@umangbhatt.com"
               data-scholar="https://scholar.google.com/citations?user=PLACEHOLDER">
            <img class="team-avatar" src="media/team/umang-bhatt.jpg" alt="Umang Bhatt">
            <h3 class="team-name">Umang Bhatt</h3>
            <p class="team-role">PI, Assistant Professor</p>
            <p class="team-org">Cambridge · CHIA</p>
          </div>
          <!-- PhD Students -->
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
               data-name="Elaf Almahmoud"
               data-role="PhD Student (co-advised with Mateja Jamnik)"
               data-org="University of Cambridge"
               data-bio="Elaf is a PhD student with the TRACE lab researching AI systems and reasoning. Elaf formerly conducted research at the Center for Complex Systems in Riyadh and MIT in Cambridge, Massachusetts, and worked as a machine learning engineer at TAHAKOM. Elaf graduated from NYU with her Master's in Computer Science and from King Saud University with her Bachelor's degree in Computer Science."
               data-interests="AI Systems,Reasoning,Machine Learning">
            <img class="team-avatar" src="media/team/elaf-almahmoud.png" alt="Elaf Almahmoud">
            <h3 class="team-name">Elaf Almahmoud</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
          </div>
        </div>

        <!-- Modal Overlay -->
        <div class="team-modal-overlay"></div>

        <!-- Modal -->
        <div class="team-modal">
          <button class="modal-close">×</button>
          <div class="modal-header">
            <img class="modal-avatar" src="" alt="">
            <div class="modal-header-text">
              <h2 class="modal-name"></h2>
              <p class="modal-role"></p>
              <p class="modal-org"></p>
            </div>
          </div>
          <div class="modal-body">
            <p class="modal-bio"></p>
            <div class="modal-interests">
              <h4>Research Interests</h4>
              <div class="interest-tags"></div>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>

        <script>
        document.addEventListener('DOMContentLoaded', function() {
          const teamCards = document.querySelectorAll('.team-card');
          const modalOverlay = document.querySelector('.team-modal-overlay');
          const modal = document.querySelector('.team-modal');

          if (!modalOverlay || !modal) return;

          // Move modal to body to avoid transform containment issues
          document.body.appendChild(modalOverlay);
          document.body.appendChild(modal);

          teamCards.forEach(card => {
            card.addEventListener('click', function() {
              const name = this.dataset.name;
              const role = this.dataset.role;
              const org = this.dataset.org || '';
              const bio = this.dataset.bio || '';
              const interests = this.dataset.interests ? this.dataset.interests.split(',') : [];
              const avatar = this.querySelector('.team-avatar')?.src || '';
              const email = this.dataset.email || '';
              const scholar = this.dataset.scholar || '';
              const github = this.dataset.github || '';
              const twitter = this.dataset.twitter || '';
              const website = this.dataset.website || '';

              modal.querySelector('.modal-avatar').src = avatar;
              modal.querySelector('.modal-name').textContent = name;
              modal.querySelector('.modal-role').textContent = role;
              modal.querySelector('.modal-org').textContent = org;
              modal.querySelector('.modal-bio').textContent = bio;

              const interestTags = modal.querySelector('.interest-tags');
              interestTags.innerHTML = interests.map(i => '<span>' + i.trim() + '</span>').join('');

              const footer = modal.querySelector('.modal-footer');
              footer.innerHTML = '';
              if (email) footer.innerHTML += '<a href="mailto:' + email + '" title="Email">Email</a>';
              if (scholar) footer.innerHTML += '<a href="' + scholar + '" target="_blank" title="Google Scholar">Scholar</a>';
              if (github) footer.innerHTML += '<a href="' + github + '" target="_blank" title="GitHub">GitHub</a>';
              if (twitter) footer.innerHTML += '<a href="' + twitter + '" target="_blank" title="Twitter">Twitter</a>';
              if (website) footer.innerHTML += '<a href="' + website + '" target="_blank" title="Website">Web</a>';

              modalOverlay.classList.add('active');
              modal.classList.add('active');
              document.body.style.overflow = 'hidden';
            });
          });

          function closeModal() {
            modalOverlay.classList.remove('active');
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }

          modalOverlay.addEventListener('click', closeModal);
          modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
          });
          modal.addEventListener('click', function(e) {
            e.stopPropagation();
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
          <a href="publication/algorithms-resign/" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>When Should Algorithms Resign?</h3>
            <p class="pub-authors">Bhatt, U., et al.</p>
            <p class="pub-description">Exploring when AI systems should defer to human judgment in high-stakes decision-making contexts.</p>
            <p class="pub-venue">IEEE Computer</p>
          </a>
          <a href="publication/building-machines-learn-think/" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>Building Machines that Think with People</h3>
            <p class="pub-authors">Collins, K., et al.</p>
            <p class="pub-description">A vision for human-AI collaboration leveraging complementary strengths of cognition and machine learning.</p>
            <p class="pub-venue">Nature Human Behavior</p>
          </a>
          <a href="publication/learning-personalized-decision-support/" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>Personalized Decision Support Policies</h3>
            <p class="pub-authors">Bhatt, U., et al.</p>
            <p class="pub-description">Learning decision support policies that adapt to individual users, improving team performance.</p>
            <p class="pub-venue">Conference Paper</p>
          </a>
        </div>
        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="publication/" class="view-all-link">View all publications →</a>
        </div>
    design:
      columns: '1'

  # Software
  - block: markdown
    id: software
    content:
      title: Software
      subtitle: ''
      text: |
        <div class="software-grid-five">
          <div class="software-card">
            <div class="software-header">
              <span class="software-icon">○</span>
              <h3>Fabric</h3>
              <span class="software-badge">Python</span>
            </div>
            <p class="software-description">A comprehensive toolkit for systematically documenting real-world AI deployments, enabling researchers and practitioners to capture deployment contexts and compare implementations.</p>
            <div class="software-links">
              <a href="https://github.com/TRACE-Lab/fabric" class="btn-github" target="_blank">View on GitHub</a>
              <a href="#" class="btn-docs">Documentation</a>
            </div>
          </div>
          <div class="software-card">
            <div class="software-header">
              <span class="software-icon">□</span>
              <h3>Modiste</h3>
              <span class="software-badge">Python</span>
            </div>
            <p class="software-description">A framework for orchestrating AI agents in complex environments, providing tools for agent coordination, communication, and deployment alongside human teams.</p>
            <div class="software-links">
              <a href="https://github.com/TRACE-Lab/modiste" class="btn-github" target="_blank">View on GitHub</a>
              <a href="#" class="btn-docs">Documentation</a>
            </div>
          </div>
          <div class="software-card">
            <div class="software-header">
              <span class="software-icon">◇</span>
              <h3>Externalis.ai</h3>
              <span class="software-badge">Platform</span>
            </div>
            <p class="software-description">A platform for social experimentation of AI, enabling researchers to study the societal impacts and externalities of AI systems in controlled environments.</p>
            <div class="software-links">
              <a href="https://externalis.ai" class="btn-github" target="_blank">Visit Platform</a>
              <a href="#" class="btn-docs">Documentation</a>
            </div>
          </div>
        </div>
    design:
      columns: '1'

  # Our Partners
  - block: markdown
    content:
      title: Our Partners
      subtitle: ''
      text: |
        <div class="affiliations-row">
          <a href="https://www.aisi.gov.uk/" target="_blank">
            <img src="https://cdn.prod.website-files.com/663bd486c5e4c81588db7a1d/663bd707cb0214d8b72951b5_5a103bfcb506b52b4e099f3dc675c649_AISI%20Logo%20Colour%20Dark.svg" alt="AI Safety Institute UK">
          </a>
          <a href="https://www.nhs.uk/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/National_Health_Service_%28England%29_logo.svg/371px-National_Health_Service_%28England%29_logo.svg.png" alt="NHS">
          </a>
          <a href="https://www.responsible.ai/" target="_blank">
            <img src="https://www.responsible.ai/wp-content/uploads/2024/05/logo-1.png" alt="Responsible AI Institute">
          </a>
        </div>
    design:
      columns: '1'

  # Affiliations
  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div class="affiliations-row">
          <a href="https://www.cam.ac.uk/" target="_blank">
            <img src="https://download.logo.wine/logo/University_of_Cambridge/University_of_Cambridge-Logo.wine.png" alt="University of Cambridge">
          </a>
          <a href="https://www.chia.cam.ac.uk/" target="_blank">
            <img src="https://securesustain.org/wp-content/uploads/2023/12/Centre-for-Human-Inspired-Artificial-Intelligence-CHIA.png" alt="CHIA">
          </a>
          <a href="https://www.kings.cam.ac.uk/" target="_blank">
            <img src="https://images.squarespace-cdn.com/content/v1/5e260fc81324310e95f2a712/1592507050732-IKRW45KPH520W6RLHASV/Kings_logo_WPPT_CENTRLSD_FULLCOLOUR.png" alt="King's College Cambridge">
          </a>
        </div>
    design:
      columns: '1'
---
