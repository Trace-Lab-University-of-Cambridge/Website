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
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Umang+Bhatt&background=e0e7ff&color=4338ca&size=200" alt="Umang Bhatt">
            <h3 class="team-name">Umang Bhatt</h3>
            <p class="team-role">PI, Assistant Professor</p>
            <p class="team-org">Cambridge · CHIA</p>
            <p class="team-topics">Trustworthy AI, HCI</p>
          </div>
          <!-- Research Associates -->
          <div class="team-card"
               data-name="Katherine Collins"
               data-role="Research Associate (Postdoc @ MIT)"
               data-org="MIT"
               data-bio="Katherine is a Research Associate working on human-AI collaboration and interpretable machine learning systems."
               data-interests="Human-AI Collaboration,Interpretable ML,Cognitive Science">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Katherine+Collins&background=e0e7ff&color=4338ca&size=200" alt="Katherine Collins">
            <h3 class="team-name">Katherine Collins</h3>
            <p class="team-role">Research Associate</p>
            <p class="team-org">MIT</p>
            <p class="team-topics">Human-AI Collaboration</p>
          </div>
          <!-- PhD Students -->
          <div class="team-card"
               data-name="Drew Calcagno"
               data-role="PhD Student"
               data-org="University of Cambridge"
               data-bio="Drew is a PhD student researching trustworthy AI deployment and human-AI interaction in high-stakes domains."
               data-interests="AI Deployment,Human-AI Interaction,Trustworthy ML">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Drew+Calcagno&background=e0e7ff&color=4338ca&size=200" alt="Drew Calcagno">
            <h3 class="team-name">Drew Calcagno</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
            <p class="team-topics">AI Deployment, HCI</p>
          </div>
          <div class="team-card"
               data-name="Noah Broestl"
               data-role="PhD Student"
               data-org="University of Cambridge"
               data-bio="Noah is a PhD student working on aspects of trustworthy AI and machine learning."
               data-interests="Trustworthy AI,Machine Learning">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Noah+Broestl&background=e0e7ff&color=4338ca&size=200" alt="Noah Broestl">
            <h3 class="team-name">Noah Broestl</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
            <p class="team-topics">Trustworthy AI</p>
          </div>
          <div class="team-card"
               data-name="Bernardo Villegas"
               data-role="PhD Student (co-advised with Anna Korhonen)"
               data-org="University of Cambridge"
               data-bio="Bernardo is a PhD student researching trustworthy AI systems."
               data-interests="Trustworthy AI,NLP">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Bernardo+Villegas&background=e0e7ff&color=4338ca&size=200" alt="Bernardo Villegas">
            <h3 class="team-name">Bernardo Villegas</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
            <p class="team-topics">Trustworthy AI, NLP</p>
          </div>
          <div class="team-card"
               data-name="Elaf Almahmoud"
               data-role="PhD Student (co-advised with Mateja Jamnik)"
               data-org="University of Cambridge"
               data-bio="Elaf is a PhD student working on AI systems and reasoning."
               data-interests="AI Systems,Reasoning,HCI">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Elaf+Almahmoud&background=e0e7ff&color=4338ca&size=200" alt="Elaf Almahmoud">
            <h3 class="team-name">Elaf Almahmoud</h3>
            <p class="team-role">PhD Student</p>
            <p class="team-org">Cambridge</p>
            <p class="team-topics">AI Systems, Reasoning</p>
          </div>
          <!-- Research Staff -->
          <div class="team-card"
               data-name="Yung-Hsuan Wu"
               data-role="Research Staff"
               data-org="University of Cambridge"
               data-bio="Yung-Hsuan works on research related to AI systems evaluation and deployment."
               data-interests="AI Evaluation,Deployment,HCI">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Yung-Hsuan+Wu&background=e0e7ff&color=4338ca&size=200" alt="Yung-Hsuan Wu">
            <h3 class="team-name">Yung-Hsuan Wu</h3>
            <p class="team-role">Research Staff</p>
            <p class="team-org">Cambridge</p>
            <p class="team-topics">AI Evaluation</p>
          </div>
          <div class="team-card"
               data-name="Siobhan Hall"
               data-role="Research Staff"
               data-org="University of Cambridge"
               data-bio="Siobhan conducts research on human-computer interaction and AI systems."
               data-interests="HCI,AI Systems,User Studies">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Siobhan+Hall&background=e0e7ff&color=4338ca&size=200" alt="Siobhan Hall">
            <h3 class="team-name">Siobhan Hall</h3>
            <p class="team-role">Research Staff</p>
            <p class="team-org">Cambridge</p>
            <p class="team-topics">HCI, User Studies</p>
          </div>
          <!-- Students -->
          <div class="team-card"
               data-name="Rigel Cierniak"
               data-role="Undergraduate Researcher (BA, Linguistics @ King's)"
               data-org="King's College, Cambridge"
               data-bio="Rigel is an undergraduate researcher studying linguistics and AI."
               data-interests="Linguistics,AI,NLP">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Rigel+Cierniak&background=e0e7ff&color=4338ca&size=200" alt="Rigel Cierniak">
            <h3 class="team-name">Rigel Cierniak</h3>
            <p class="team-role">Undergraduate Researcher</p>
            <p class="team-org">King's College</p>
            <p class="team-topics">Linguistics, NLP</p>
          </div>
          <!-- Visitors -->
          <div class="team-card"
               data-name="Rose Guingrich"
               data-role="Visiting Student (PhD @ Princeton)"
               data-org="Princeton University"
               data-bio="Rose is a visiting PhD student from Princeton University."
               data-interests="AI,Machine Learning">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Rose+Guingrich&background=e0e7ff&color=4338ca&size=200" alt="Rose Guingrich">
            <h3 class="team-name">Rose Guingrich</h3>
            <p class="team-role">Visiting Student</p>
            <p class="team-org">Princeton</p>
            <p class="team-topics">AI, ML</p>
          </div>
          <div class="team-card"
               data-name="Hamza Alshamy"
               data-role="Visiting Student (MS @ NYU)"
               data-org="New York University"
               data-bio="Hamza is a visiting master's student from NYU."
               data-interests="AI,Machine Learning">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Hamza+Alshamy&background=e0e7ff&color=4338ca&size=200" alt="Hamza Alshamy">
            <h3 class="team-name">Hamza Alshamy</h3>
            <p class="team-role">Visiting Student</p>
            <p class="team-org">NYU</p>
            <p class="team-topics">AI, ML</p>
          </div>
          <div class="team-card"
               data-name="Mihir Upadhyay"
               data-role="Visiting Student (MS @ NYU)"
               data-org="New York University"
               data-bio="Mihir is a visiting master's student from NYU."
               data-interests="AI,Machine Learning">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Mihir+Upadhyay&background=e0e7ff&color=4338ca&size=200" alt="Mihir Upadhyay">
            <h3 class="team-name">Mihir Upadhyay</h3>
            <p class="team-role">Visiting Student</p>
            <p class="team-org">NYU</p>
            <p class="team-topics">AI, ML</p>
          </div>
          <div class="team-card"
               data-name="Mohamed Hendy"
               data-role="Visiting Student (MS @ MBZUAI)"
               data-org="MBZUAI"
               data-bio="Mohamed is a visiting master's student from MBZUAI."
               data-interests="AI,Machine Learning">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Mohamed+Hendy&background=e0e7ff&color=4338ca&size=200" alt="Mohamed Hendy">
            <h3 class="team-name">Mohamed Hendy</h3>
            <p class="team-role">Visiting Student</p>
            <p class="team-org">MBZUAI</p>
            <p class="team-topics">AI, ML</p>
          </div>
          <div class="team-card"
               data-name="Dvija Mehta"
               data-role="Visiting Student (RA @ IIT Bombay)"
               data-org="IIT Bombay"
               data-bio="Dvija is a visiting research assistant from IIT Bombay."
               data-interests="AI,Machine Learning">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Dvija+Mehta&background=e0e7ff&color=4338ca&size=200" alt="Dvija Mehta">
            <h3 class="team-name">Dvija Mehta</h3>
            <p class="team-role">Visiting Student</p>
            <p class="team-org">IIT Bombay</p>
            <p class="team-topics">AI, ML</p>
          </div>
          <!-- Affiliates -->
          <div class="team-card"
               data-name="Francesco Quinzan"
               data-role="Affiliated Scholar (Postdoc @ Oxford)"
               data-org="University of Oxford"
               data-bio="Francesco is an affiliated scholar and postdoc at Oxford."
               data-interests="AI,Machine Learning,Trustworthy AI">
            <img class="team-avatar" src="https://ui-avatars.com/api/?name=Francesco+Quinzan&background=e0e7ff&color=4338ca&size=200" alt="Francesco Quinzan">
            <h3 class="team-name">Francesco Quinzan</h3>
            <p class="team-role">Affiliated Scholar</p>
            <p class="team-org">Oxford</p>
            <p class="team-topics">Trustworthy AI</p>
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
              if (email) footer.innerHTML += '<a href="mailto:' + email + '" title="Email">✉️</a>';
              if (scholar) footer.innerHTML += '<a href="' + scholar + '" target="_blank" title="Google Scholar">🎓</a>';
              if (github) footer.innerHTML += '<a href="' + github + '" target="_blank" title="GitHub">💻</a>';
              if (twitter) footer.innerHTML += '<a href="' + twitter + '" target="_blank" title="Twitter">🐦</a>';
              if (website) footer.innerHTML += '<a href="' + website + '" target="_blank" title="Website">🌐</a>';

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
    id: software
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
