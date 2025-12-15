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
            <div class="card-icon">📋</div>
            <h3>Deployment as a Science</h3>
            <p>Developing systematic approaches to document and understand how AI systems are deployed and used across diverse real-world contexts.</p>
            <div class="card-tags">
              <span class="research-badge tag-deployment">Deployment</span>
              <span class="research-badge tag-hci">HCI</span>
            </div>
          </a>
          <a href="project/externalities-human-ai/" class="research-card">
            <div class="card-icon">🌍</div>
            <h3>Externalities of Human-AI Interaction</h3>
            <p>Investigating the broader impacts of AI use on individuals, communities, and society—both intended and unintended consequences.</p>
            <div class="card-tags">
              <span class="research-badge tag-society">Society</span>
              <span class="research-badge tag-fairness">Fairness</span>
            </div>
          </a>
          <a href="project/affordances-ai-use/" class="research-card">
            <div class="card-icon">🤝</div>
            <h3>Affordances of AI Use</h3>
            <p>Understanding how people perceive, interpret, and interact with AI systems in their daily lives and professional workflows.</p>
            <div class="card-tags">
              <span class="research-badge tag-hci">HCI</span>
              <span class="research-badge tag-trustworthy">Trust</span>
            </div>
          </a>
          <a href="project/agent-orchestration/" class="research-card">
            <div class="card-icon">🤖</div>
            <h3>Agent Orchestration</h3>
            <p>Designing frameworks for deploying and coordinating AI agents that work alongside humans in complex, dynamic environments.</p>
            <div class="card-tags">
              <span class="research-badge tag-agents">Agents</span>
              <span class="research-badge tag-deployment">Deployment</span>
            </div>
          </a>
          <a href="project/fundamentals-trustworthy-ai/" class="research-card">
            <div class="card-icon">🔬</div>
            <h3>Fundamentals of Trustworthy AI</h3>
            <p>Core research on building AI systems that are reliable, fair, transparent, and aligned with human values and expectations.</p>
            <div class="card-tags">
              <span class="research-badge tag-trustworthy">Trust</span>
              <span class="research-badge tag-explainability">Explainability</span>
              <span class="research-badge tag-fairness">Fairness</span>
            </div>
          </a>
        </div>
    design:
      columns: '1'

  # Team
  - block: markdown
    content:
      title: Team
      subtitle: ''
      text: |
        <div class="team-grid">
          <div class="team-card"
               data-name="Umang Bhatt"
               data-role="Lab Director & Assistant Professor"
               data-org="University of Cambridge"
               data-bio="Dr. Umang Bhatt is an Assistant Professor in Trustworthy Artificial Intelligence at the University of Cambridge and its Centre for Human-Inspired AI. He leads the TRACE Lab, focusing on building trustworthy AI systems for high-stakes settings like healthcare, education, and public safety."
               data-interests="Trustworthy AI,Human-AI Interaction,Machine Learning,Explainability"
               data-email="ub@umangbhatt.com"
               data-scholar="https://scholar.google.com/citations?user=PLACEHOLDER"
               data-github="https://github.com/">
            <img class="team-avatar" src="https://via.placeholder.com/160?text=UB" alt="Umang Bhatt">
            <h3 class="team-name">Umang Bhatt</h3>
            <p class="team-role">Lab Director</p>
          </div>
          <div class="team-card"
               data-name="Katherine Collins"
               data-role="Research Associate (Postdoc @ MIT)"
               data-org="MIT"
               data-bio="Katherine is a Research Associate working on human-AI collaboration and interpretable machine learning systems."
               data-interests="Human-AI Collaboration,Interpretable ML,Cognitive Science">
            <img class="team-avatar" src="https://via.placeholder.com/160?text=KC" alt="Katherine Collins">
            <h3 class="team-name">Katherine Collins</h3>
            <p class="team-role">Research Associate</p>
          </div>
          <div class="team-card"
               data-name="Drew Calcagno"
               data-role="PhD Student"
               data-org="University of Cambridge"
               data-bio="Drew is a PhD student researching trustworthy AI deployment and human-AI interaction in high-stakes domains."
               data-interests="AI Deployment,Human-AI Interaction,Trustworthy ML">
            <img class="team-avatar" src="https://via.placeholder.com/160?text=DC" alt="Drew Calcagno">
            <h3 class="team-name">Drew Calcagno</h3>
            <p class="team-role">PhD Student</p>
          </div>
          <div class="team-card"
               data-name="Yung-Hsuan Wu"
               data-role="Research Staff"
               data-org="University of Cambridge"
               data-bio="Yung-Hsuan works on research related to AI systems evaluation and deployment."
               data-interests="AI Evaluation,Deployment,HCI">
            <img class="team-avatar" src="https://via.placeholder.com/160?text=YW" alt="Yung-Hsuan Wu">
            <h3 class="team-name">Yung-Hsuan Wu</h3>
            <p class="team-role">Research Staff</p>
          </div>
          <div class="team-card"
               data-name="Siobhan Hall"
               data-role="Research Staff"
               data-org="University of Cambridge"
               data-bio="Siobhan conducts research on human-computer interaction and AI systems."
               data-interests="HCI,AI Systems,User Studies">
            <img class="team-avatar" src="https://via.placeholder.com/160?text=SH" alt="Siobhan Hall">
            <h3 class="team-name">Siobhan Hall</h3>
            <p class="team-role">Research Staff</p>
          </div>
          <div class="team-card"
               data-name="Noah Broestl"
               data-role="PhD Student"
               data-org="University of Cambridge"
               data-bio="Noah is a PhD student working on aspects of trustworthy AI and machine learning."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="https://via.placeholder.com/160?text=NB" alt="Noah Broestl">
            <h3 class="team-name">Noah Broestl</h3>
            <p class="team-role">PhD Student</p>
          </div>
        </div>

        <!-- Modal Overlay -->
        <div class="team-modal-overlay"></div>

        <!-- Modal -->
        <div class="team-modal">
          <button class="modal-close">×</button>
          <div class="modal-header">
            <img class="modal-avatar" src="" alt="">
            <h2 class="modal-name"></h2>
            <p class="modal-role"></p>
            <p class="modal-org"></p>
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

        <div style="text-align: center; margin-top: 1.5rem;">
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
            <div class="card-icon">📄</div>
            <span class="pub-year">2025</span>
            <h3>Documenting Deployment with Fabric</h3>
            <p class="pub-authors">Bhatt, U., et al.</p>
            <p class="pub-description">A toolkit for systematically documenting AI deployment contexts, enabling better understanding and comparison of real-world AI implementations.</p>
            <p class="pub-venue">AIES 2025</p>
            <div class="card-tags">
              <span class="research-badge tag-deployment">Deployment</span>
              <span class="research-badge tag-hci">HCI</span>
            </div>
          </a>
          <a href="publication/algorithms-resign/" class="pub-card">
            <div class="card-icon">📄</div>
            <span class="pub-year">2024</span>
            <h3>When Should Algorithms Resign?</h3>
            <p class="pub-authors">Bhatt, U., et al.</p>
            <p class="pub-description">Exploring when AI systems should defer to human judgment, examining the boundaries of algorithmic decision-making in high-stakes contexts.</p>
            <p class="pub-venue">IEEE Computer</p>
            <div class="card-tags">
              <span class="research-badge tag-trustworthy">Trust</span>
              <span class="research-badge tag-healthcare">Healthcare</span>
            </div>
          </a>
          <a href="publication/building-machines-learn-think/" class="pub-card">
            <div class="card-icon">📄</div>
            <span class="pub-year">2024</span>
            <h3>Building Machines that Learn and Think with People</h3>
            <p class="pub-authors">Collins, K., et al.</p>
            <p class="pub-description">A vision for human-AI collaboration that leverages complementary strengths of human cognition and machine learning capabilities.</p>
            <p class="pub-venue">Nature Human Behavior</p>
            <div class="card-tags">
              <span class="research-badge tag-hci">HCI</span>
              <span class="research-badge tag-trustworthy">Trust</span>
            </div>
          </a>
          <a href="publication/learning-personalized-decision-support/" class="pub-card">
            <div class="card-icon">📄</div>
            <span class="pub-year">2024</span>
            <h3>Learning Personalized Decision Support Policies</h3>
            <p class="pub-authors">Bhatt, U., et al.</p>
            <p class="pub-description">Methods for learning decision support policies that adapt to individual users, improving human-AI team performance.</p>
            <p class="pub-venue">Conference Paper</p>
            <div class="card-tags">
              <span class="research-badge tag-explainability">Explainability</span>
              <span class="research-badge tag-hci">HCI</span>
            </div>
          </a>
        </div>
        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="publication/" class="view-all-link">View all publications →</a>
        </div>
    design:
      columns: '1'

  # Software
  - block: markdown
    content:
      title: Software
      subtitle: ''
      text: |
        <div class="software-grid-five">
          <div class="software-card">
            <div class="software-header">
              <span class="software-icon">📦</span>
              <h3>Fabric</h3>
              <span class="software-badge">Python</span>
            </div>
            <div class="software-stats">
              <span>⭐ 45</span>
              <span>🍴 12</span>
            </div>
            <p class="software-description">A comprehensive toolkit for systematically documenting real-world AI deployments, enabling researchers and practitioners to capture deployment contexts and compare implementations.</p>
            <div class="software-tags">
              <span>deployment</span>
              <span>documentation</span>
              <span>ai-ethics</span>
              <span>toolkit</span>
            </div>
            <div class="software-links">
              <a href="https://github.com/TRACE-Lab/fabric" class="btn-github" target="_blank">View on GitHub</a>
              <a href="#" class="btn-docs">Documentation</a>
            </div>
          </div>
          <div class="software-card">
            <div class="software-header">
              <span class="software-icon">🤖</span>
              <h3>Modiste</h3>
              <span class="software-badge">Python</span>
            </div>
            <div class="software-stats">
              <span>⭐ 28</span>
              <span>🍴 8</span>
            </div>
            <p class="software-description">A framework for orchestrating AI agents in complex environments, providing tools for agent coordination, communication, and deployment alongside human teams.</p>
            <div class="software-tags">
              <span>agents</span>
              <span>orchestration</span>
              <span>multi-agent</span>
              <span>framework</span>
            </div>
            <div class="software-links">
              <a href="https://github.com/TRACE-Lab/modiste" class="btn-github" target="_blank">View on GitHub</a>
              <a href="#" class="btn-docs">Documentation</a>
            </div>
          </div>
          <div class="software-card">
            <div class="software-header">
              <span class="software-icon">🌐</span>
              <h3>Externalis.ai</h3>
              <span class="software-badge">Platform</span>
            </div>
            <div class="software-stats">
              <span>🧪 Beta</span>
            </div>
            <p class="software-description">A platform for social experimentation of AI, enabling researchers to study the societal impacts and externalities of AI systems in controlled environments.</p>
            <div class="software-tags">
              <span>social-ai</span>
              <span>experimentation</span>
              <span>externalities</span>
              <span>platform</span>
            </div>
            <div class="software-links">
              <a href="https://externalis.ai" class="btn-github" target="_blank">Visit Platform</a>
              <a href="#" class="btn-docs">Documentation</a>
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
