const buildBrandSections = () => {
    const imgDefaut = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiS2fZkZP0QlKxcQjSe5yABWHJmsw_wHA39Nxq9d2ruPuAR5LwnGLSV1YXEf8A6TXHVGLTSfWXyNnilPKKifnpaDiL15obkhiD9_29BhULwJ89l2cwjwA3H8n-B_Be3KTUNw5CZSZwKS19us8XFjf53LozEX5VwhilXXOO4PP-n8QkNm6JkdHaZl0uLV4Ye/s600/PROMO.png";
    const brandPages = document.querySelectorAll('.custom-brand-page');
    if(!brandPages) return;
    
    brandPages.forEach(page => {
        const id1 = page.getAttribute('data-marque-id'); 
        if(!id1) return;

        page.querySelectorAll('.brand-section').forEach(container => {
            const id2 = container.getAttribute('data-section-id') || ""; 
            const rawTitle = container.getAttribute('data-title') || "Offre Spéciale";
            const icon = container.getAttribute('data-icon') || "fa-tag";
            
            container.innerHTML = `
                <div class="section-title" style="margin-top:20px;"><i class="fas ${icon}" style="color:var(--theme-color);"></i> ${rawTitle}</div>
                <div class="section-content scroll-grid">
                    <div style="text-align:center; padding:20px; width:100%;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--theme-color);"></i></div>
                </div>
            `;

            const contentDiv = container.querySelector('.section-content');
            const query = id1 + " " + id2;
            const fetchUrl = `/feeds/posts/default?alt=json&q=${encodeURIComponent(query.trim())}&max-results=8`;

            fetch(fetchUrl)
                .then(res => res.ok ? res.json() : Promise.reject("Erreur réseau"))
                .then(data => {
                    if (data.feed && data.feed.entry && data.feed.entry.length > 0) {
                        contentDiv.innerHTML = data.feed.entry.map(e => {
                            let t = e.title?.$t || "Offre";
                            let url = e.link?.find(l=>l.rel==='alternate')?.href || '#';
                            let img = e.media$thumbnail ? e.media$thumbnail.url.replace('/s72-c/', '/s600-c/') : imgDefaut;
                            // On extrait un bout du texte de l'article pour le mettre au dos de la carte
                            let txt = (e.content?.$t || e.summary?.$t || '').replace(/<[^>]*>?/gm, ' ').trim().substring(0, 100) + '...';
                            let safeBrand = id1.replace('ID-', '');

                            return `
                            <div class="flip-card scroll-card">
                              <div class="flip-inner">
                                <div class="flip-front">
                                  <div class="card-image">
                                    <div class="brand-tag">${safeBrand}</div>
                                    <img src="${img}" alt="${t}">
                                  </div>
                                  <div class="card-content">
                                    <span class="offer-badge">Offre Vérifiée</span>
                                    <h3>${t}</h3>
                                    <a href="${url}" target="_blank" style="width:100%; text-decoration:none;"><button class="btn-more"><i class="fas fa-external-link-alt"></i> Voir l'offre</button></a>
                                    <button class="btn-more btn-flip-front"><i class="fas fa-ticket-alt"></i> Voir le Code</button>
                                  </div>
                                </div>
                                <div class="flip-back">
                                  <div style="color:var(--theme-color); font-weight:bold; margin-bottom:5px;">IVOIRE PROMO</div>
                                  <div style="font-weight:700; font-size:0.9rem;">${t}</div>
                                  <div style="background:var(--theme-color); color:white; padding:10px; border-radius:10px; margin:10px 0; font-family:monospace; font-size:1rem; width:100%; overflow-y:auto; max-height:80px;">${txt}</div>
                                  <button class="btn-close btn-flip-back"><i class="fas fa-undo"></i> Retour</button>
                                </div>
                              </div>
                            </div>`;
                        }).join('');

                        // Activation de l'effet 3D au clic
                        contentDiv.querySelectorAll('.flip-card').forEach(card => {
                            card.querySelector('.btn-flip-front')?.addEventListener('click', (ev) => { ev.preventDefault(); card.classList.add('rotate'); });
                            card.querySelector('.btn-flip-back')?.addEventListener('click', (ev) => { ev.preventDefault(); card.classList.remove('rotate'); });
                        });
                    } else {
                        contentDiv.innerHTML = `<p style="padding:20px; color:#777; font-size:0.9rem;">Aucune offre disponible pour le moment.</p>`;
                    }
                }).catch(err => contentDiv.innerHTML = '<p style="color:red; padding:20px;">Erreur de chargement.</p>');
        });
    });
};
buildBrandSections();
