document.getElementById("analyze-btn").addEventListener("click", async () => {
    const input = document.getElementById("file-input");
    const resultsDiv = document.getElementById("results");
  
    if (!input.files.length) {
      resultsDiv.innerHTML = "<p style='color:red;'>Merci de sélectionner une image de ticket.</p>";
      return;
    }
  
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = async () => {
      resultsDiv.innerHTML = "<p>Analyse en cours...</p>";
  
      try {
        const { data: { text } } = await Tesseract.recognize(
          reader.result,
          'fra', // français
          {
            logger: m => console.log(m)
          }
        );
  
        resultsDiv.innerHTML = `<h3>Texte détecté :</h3><pre>${text}</pre>`;
      } catch (error) {
        resultsDiv.innerHTML = `<p style="color:red;">Erreur lors de l'analyse : ${error.message}</p>`;
      }
    };
  
    reader.readAsDataURL(file);
  });
  