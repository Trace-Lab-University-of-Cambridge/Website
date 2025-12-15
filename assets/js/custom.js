// Team Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all team cards and modal elements
  const teamCards = document.querySelectorAll('.team-card');
  const modalOverlay = document.querySelector('.team-modal-overlay');
  const modal = document.querySelector('.team-modal');

  if (!modalOverlay || !modal) return;

  // Open modal when clicking a team card
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

      // Populate modal
      modal.querySelector('.modal-avatar').src = avatar;
      modal.querySelector('.modal-name').textContent = name;
      modal.querySelector('.modal-role').textContent = role;
      modal.querySelector('.modal-org').textContent = org;
      modal.querySelector('.modal-bio').textContent = bio;

      // Populate interests
      const interestTags = modal.querySelector('.interest-tags');
      interestTags.innerHTML = interests.map(i => `<span>${i.trim()}</span>`).join('');

      // Populate social links
      const footer = modal.querySelector('.modal-footer');
      footer.innerHTML = '';
      if (email) footer.innerHTML += `<a href="mailto:${email}" title="Email">✉️</a>`;
      if (scholar) footer.innerHTML += `<a href="${scholar}" target="_blank" title="Google Scholar">🎓</a>`;
      if (github) footer.innerHTML += `<a href="${github}" target="_blank" title="GitHub">💻</a>`;
      if (twitter) footer.innerHTML += `<a href="${twitter}" target="_blank" title="Twitter">🐦</a>`;
      if (website) footer.innerHTML += `<a href="${website}" target="_blank" title="Website">🌐</a>`;

      // Show modal
      modalOverlay.classList.add('active');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalOverlay.addEventListener('click', closeModal);
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // Prevent modal content click from closing
  modal.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});
