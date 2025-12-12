---
title:
date: 2024-01-01
type: landing

sections:
  - block: hero
    content:
      title: |
        TRACE Lab
      image:
        filename: welcome.jpg
      text: |
        <br>

        **TRustworthy Artificial IntelligenCE Laboratory**

        University of Cambridge · Centre for Human-Inspired Artificial Intelligence · Institute of Technology and Humanity

  - block: markdown
    content:
      title: About Us
      subtitle: ''
      text: |
        The **TRACE Lab** at the University of Cambridge is a research group focused on building trustworthy artificial intelligence (AI) systems for high-stakes settings, like healthcare, education, and public safety.

        We develop new algorithms and tools that support effective human-AI interaction and manage the partnership between humans and AI agents. Drawing from **machine learning**, **human-computer interaction**, and **social science**, we investigate when and how AI can be trusted, integrated into decision-making, and evaluated in ecologically valid settings.

        We work with partners across government, industry, and civil society, including Partnership on AI, Mozilla, RAII, and OECD.
    design:
      columns: '1'

  - block: markdown
    content:
      title: Research Initiatives
      subtitle: 'For 2026, we have four broad initiatives that capture the breadth of our work'
      text: |
        ### Deployment as a Science
        How do people use AI systems around the world?

        ### Externalities of Human-AI Interaction
        What is the impact of AI use?

        ### Affordances of AI Use
        How do people interact with AI systems?

        ### Agent Orchestration
        How do we deploy AI agents among humans?

        [Learn more about our research →](research/)
    design:
      columns: '1'

  - block: collection
    content:
      title: Latest News
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'

  - block: collection
    content:
      title: Recent Publications
      text: ""
      count: 5
      filters:
        folders:
          - publication
    design:
      view: citation
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
    design:
      columns: '1'
---
