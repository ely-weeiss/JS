
window.domainesAutorises = [
    "ivoirepromo.com",
    "ivoirepromo225.blogspot.com",];
var _0x45f2=['indexOf','hostname'...];
(function() {
    // 1. On récupère la liste des domaines autorisés
    var allowed = window.domainesAutorises ;
    var currentHost = window.location.hostname;
    var isAuthorized = false;

    // 2. On vérifie le domaine
    for (var i = 0; i < allowed.length; i++) {
        if (currentHost.indexOf(allowed[i]) !== -1) {
            isAuthorized = true;
            break;
        }
    }

    // 3. LA PUNITION (Message de droit d'auteur)
    if (!isAuthorized) {
        // Affiche le message d'erreur avec un beau design
        document.body.innerHTML = `
            <div style="text-align:center; padding:100px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#fcf8f2; height:100vh; box-sizing:border-box;">
                <div style="max-width:600px; margin:0 auto; background:#fff; padding:40px; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.05); border:1px solid #eaeaea;">
                    <h1 style="color:#2b562a; font-size:2rem; margin-bottom:15px;">⚠️ Thème protégé par droit d'auteur</h1>
                    <p style="color:#555; font-size:1.1rem; margin-bottom:10px;">Ce modèle Blogger n'est pas autorisé à fonctionner sur ce nom de domaine.</p>
                    <p style="color:#555; font-size:1.1rem; margin-bottom:25px;">Veuillez consulter notre site officiel pour en savoir plus ou obtenir une licence.</p>
                    <a href="https://theme.ivoirepromo.com" style="display:inline-block; padding:15px 30px; background:#2b562a; color:#fff; text-decoration:none; border-radius:30px; font-weight:bold; font-size:1.1rem; transition:0.3s;">Visiter theme.ivoirepromo.com</a>
                </div>
            </div>
        `;
        
        
    }
})();
