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
          <p class="hero-subtitle">TRustworthy Artificial IntelligenCE Laboratory · University of Cambridge</p>
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
        padding: ["200px", "0", "200px", "0"]

  # About
  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div class="about-section">

        We build trustworthy AI systems for high-stakes settings like **healthcare**, **education**, and **public safety**. Drawing from machine learning, human-computer interaction, and social science, we investigate when and how AI can be trusted, integrated into decision-making, and evaluated in ecologically valid settings.

        We partner with [Partnership on AI](https://partnershiponai.org/), [Mozilla](https://mozilla.org/), [RAII](https://raii.org/), and [OECD](https://oecd.org/).

        </div>
    design:
      columns: '1'

  # Research
  - block: markdown
    content:
      title: Research
      subtitle: ''
      text: |
        <div class="research-grid-five">
          <a href="project/deployment-as-a-science/" class="research-card">
            <span class="research-badge">Fabric</span>
            <h3>Deployment as a Science</h3>
            <p>How do people use AI systems around the world?</p>
          </a>
          <a href="project/externalities-human-ai/" class="research-card">
            <h3>Externalities of Human-AI Interaction</h3>
            <p>What is the impact of AI use on people and society?</p>
          </a>
          <a href="project/affordances-ai-use/" class="research-card">
            <h3>Affordances of AI Use</h3>
            <p>How do people interact with AI systems?</p>
          </a>
          <a href="project/agent-orchestration/" class="research-card">
            <span class="research-badge">Modiste</span>
            <h3>Agent Orchestration</h3>
            <p>How do we deploy AI agents among humans?</p>
          </a>
          <a href="project/fundamentals-trustworthy-ai/" class="research-card">
            <h3>Fundamentals of Trustworthy AI</h3>
            <p>Core research on reliability, fairness, and transparency.</p>
          </a>
        </div>
    design:
      columns: '1'

  # Team
  - block: people
    content:
      title: Team
      user_groups:
        - Principal Investigators
        - PhD Candidates
      sort_by: Params.last_name
      sort_ascending: true
    design:
      show_interests: false
      show_role: true
      show_social: true
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div style="text-align: center; margin-top: -1rem; margin-bottom: 2rem;">
          <a href="people/" class="view-all-link">View all team →</a>
        </div>
    design:
      columns: '1'

  # Publications
  - block: markdown
    content:
      title: Recent Publications
      subtitle: ''
      text: |
        <div class="pub-grid-five">
          <a href="publication/fabric-deployment/" class="pub-card">
            <span class="pub-year">2025</span>
            <h3>Documenting Deployment with Fabric</h3>
            <p class="pub-venue">AIES</p>
          </a>
          <a href="publication/algorithms-resign/" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>When Should Algorithms Resign?</h3>
            <p class="pub-venue">IEEE Computer</p>
          </a>
          <a href="publication/building-machines-learn-think/" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>Building Machines that Learn and Think with People</h3>
            <p class="pub-venue">Nature Human Behavior</p>
          </a>
          <a href="publication/learning-personalized-decision-support/" class="pub-card">
            <span class="pub-year">2024</span>
            <h3>Learning Personalized Decision Support Policies</h3>
            <p class="pub-venue">Conference Paper</p>
          </a>
          <a href="publication/" class="pub-card pub-card-more">
            <h3>View all →</h3>
          </a>
        </div>
    design:
      columns: '1'

  # Software
  - block: markdown
    content:
      title: Software
      subtitle: ''
      text: |
        <div class="software-grid">
          <div class="software-card">
            <div class="software-header">
              <h3>Fabric</h3>
              <span class="software-lang">Python</span>
            </div>
            <p>A repository and toolkit for documenting real-world AI deployment and governance practices.</p>
            <div class="software-links">
              <a href="#" class="software-btn">GitHub</a>
              <a href="#" class="software-btn">Docs</a>
            </div>
          </div>
          <div class="software-card">
            <div class="software-header">
              <h3>Modiste</h3>
              <span class="software-lang">Python</span>
            </div>
            <p>Framework for orchestrating and coordinating multiple AI agents in human-centric environments.</p>
            <div class="software-links">
              <a href="#" class="software-btn">GitHub</a>
              <a href="#" class="software-btn">Docs</a>
            </div>
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
        <div class="affiliations-row">
          <a href="https://www.cam.ac.uk/" target="_blank">
            <img src="https://download.logo.wine/logo/University_of_Cambridge/University_of_Cambridge-Logo.wine.png" alt="University of Cambridge">
          </a>
          <a href="https://www.chia.cam.ac.uk/" target="_blank">
            <img src="https://securesustain.org/wp-content/uploads/2023/12/Centre-for-Human-Inspired-Artificial-Intelligence-CHIA.png" alt="CHIA">
          </a>
          <a href="https://www.kings.cam.ac.uk/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kingscollegearms.svg/200px-Kingscollegearms.svg.png" alt="King's College Cambridge">
          </a>
        </div>
    design:
      columns: '1'
---
