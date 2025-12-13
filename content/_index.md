---
title:
date: 2024-01-01
type: landing

sections:
  - block: markdown
    content:
      title:
      subtitle:
      text: |
        <div style="text-align: center; padding: 5rem 0 3rem 0; max-width: 700px; margin: 0 auto;">
          <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: -0.03em; line-height: 1.1;">TRACE Lab</h1>
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem; opacity: 0.6; font-weight: 500;">TRustworthy Artificial IntelligenCE Laboratory</p>
          <p style="font-size: 0.9rem; opacity: 0.5;">University of Cambridge</p>
        </div>
    design:
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div style="max-width: 650px; margin: 0 auto; text-align: center; padding: 0 0 3rem 0; font-size: 1.05rem; line-height: 1.7;">

        We build trustworthy AI systems for high-stakes settings like healthcare, education, and public safety. Our research spans **machine learning**, **human-computer interaction**, and **social science**.

        </div>
    design:
      columns: '1'

  - block: markdown
    content:
      title: Research
      subtitle: ''
      text: |
        <div style="max-width: 800px; margin: 2rem auto 0 auto;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <a href="project/deployment-as-a-science/" class="research-card" style="text-decoration: none; color: inherit; display: block; padding: 1.5rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; transition: all 0.2s ease;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Deployment as a Science</h3>
              <p style="margin: 0; opacity: 0.6; font-size: 0.875rem; line-height: 1.5;">How do people use AI systems around the world?</p>
            </a>
            <a href="project/externalities-human-ai/" class="research-card" style="text-decoration: none; color: inherit; display: block; padding: 1.5rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; transition: all 0.2s ease;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Externalities of Human-AI Interaction</h3>
              <p style="margin: 0; opacity: 0.6; font-size: 0.875rem; line-height: 1.5;">What is the impact of AI use?</p>
            </a>
            <a href="project/affordances-ai-use/" class="research-card" style="text-decoration: none; color: inherit; display: block; padding: 1.5rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; transition: all 0.2s ease;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Affordances of AI Use</h3>
              <p style="margin: 0; opacity: 0.6; font-size: 0.875rem; line-height: 1.5;">How do people interact with AI systems?</p>
            </a>
            <a href="project/agent-orchestration/" class="research-card" style="text-decoration: none; color: inherit; display: block; padding: 1.5rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; transition: all 0.2s ease;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Agent Orchestration</h3>
              <p style="margin: 0; opacity: 0.6; font-size: 0.875rem; line-height: 1.5;">How do we deploy AI agents among humans?</p>
            </a>
          </div>
          <a href="project/fundamentals-trustworthy-ai/" class="research-card" style="text-decoration: none; color: inherit; display: block; padding: 1.5rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; transition: all 0.2s ease; margin-top: 1rem;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">Fundamentals of Trustworthy AI</h3>
            <p style="margin: 0; opacity: 0.6; font-size: 0.875rem; line-height: 1.5;">Bridging research in transparency, collaboration, and evaluation</p>
          </a>
        </div>
        <style>
          .research-card:hover {
            border-color: rgba(0,0,0,0.2) !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          }
          .dark .research-card {
            border-color: rgba(255,255,255,0.1) !important;
          }
          .dark .research-card:hover {
            border-color: rgba(255,255,255,0.2) !important;
          }
        </style>
    design:
      columns: '1'

  - block: collection
    content:
      title: Publications
      text: ""
      count: 5
      filters:
        folders:
          - publication
    design:
      view: citation
      columns: '1'

  - block: people
    content:
      title: Team
      user_groups:
        - Principal Investigator
        - PhD Students
        - Research Staff
        - Students
        - Visitors
        - Affiliates
      sort_by: Params.last_name
      sort_ascending: true
    design:
      show_interests: false
      show_role: true
      show_social: false
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        <div style="text-align: center; padding: 2rem 0;">
          <a href="./people/" style="font-weight: 500; font-size: 0.9rem;">View all team members →</a>
        </div>
    design:
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle: ''
      text: |
        <div style="display: flex; justify-content: center; align-items: center; gap: 4rem; flex-wrap: wrap; padding: 3rem 0; opacity: 0.5;">
          <a href="https://www.cam.ac.uk/" target="_blank" style="transition: opacity 0.2s;">
            <img src="https://download.logo.wine/logo/University_of_Cambridge/University_of_Cambridge-Logo.wine.png" alt="University of Cambridge" style="height: 60px; width: auto; filter: grayscale(100%);">
          </a>
          <a href="https://www.chia.cam.ac.uk/" target="_blank" style="transition: opacity 0.2s;">
            <img src="https://securesustain.org/wp-content/uploads/2023/12/Centre-for-Human-Inspired-Artificial-Intelligence-CHIA.png" alt="CHIA" style="height: 45px; width: auto; filter: grayscale(100%);">
          </a>
          <a href="https://www.kings.cam.ac.uk/" target="_blank" style="transition: opacity 0.2s;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kingscollegearms.svg/200px-Kingscollegearms.svg.png" alt="King's College Cambridge" style="height: 60px; width: auto; filter: grayscale(100%);">
          </a>
        </div>
    design:
      columns: '1'
---
