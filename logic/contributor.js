const REPO_OWNER = "lord-cyclone100";
const REPO_NAME = "watchkraft";
const GITHUB_TOKEN = "";

async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
      {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
      }
    );

    if (!response.ok) throw new Error("Failed to fetch contributors");

    const contributors = await response.json();

    contributors.forEach((contributor) => {
      const card = document.createElement("div");
      card.className = "contributor-card";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "center";
      card.style.padding = "20px";
      card.style.borderRadius = "12px";
      card.style.backgroundColor = "#f5f5f5";
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      card.style.margin = "10px";
      card.style.width = "250px";

      const img = document.createElement("img");
      img.src = contributor.avatar_url;
      img.alt = contributor.login;
      img.style.width = "120px";
      img.style.height = "120px";
      img.style.borderRadius = "50%";
      img.style.marginBottom = "15px";
      img.style.objectFit = "cover";

      const name = document.createElement("h3");
      name.textContent = contributor.login;
      name.style.marginBottom = "10px";
      name.style.fontFamily = "Arial, sans-serif";

      const githubLink = document.createElement("a");
      githubLink.href = contributor.html_url;
      githubLink.textContent = "GitHub";
      githubLink.target = "_blank";
      githubLink.style.textDecoration = "none";
      githubLink.style.fontWeight = "bold";
      githubLink.style.color = "#000";
      githubLink.style.alignSelf = "center";

      const certificateButton = document.createElement("button");
      certificateButton.textContent = "Certificate";
      certificateButton.style.padding = "8px 12px";
      certificateButton.style.borderRadius = "20px";
      certificateButton.style.border = "none";
      certificateButton.style.backgroundColor = "#000";
      certificateButton.style.color = "#fff";
      certificateButton.style.cursor = "pointer";

      certificateButton.addEventListener("click", () => {
        generateCertificate(contributor.login, contributor.avatar_url);
      });

      const actionContainer = document.createElement("div");
      actionContainer.style.display = "flex";
      actionContainer.style.justifyContent = "center";
      actionContainer.style.gap = "10px";
      actionContainer.style.marginTop = "10px";

      actionContainer.appendChild(githubLink);
      actionContainer.appendChild(certificateButton);

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(actionContainer);
      contributorsContainer.appendChild(card);
    });

    function generateCertificate(username, avatarUrl) {
      canvas.width = 1600;
      canvas.height = 1000;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgb(99, 95, 95)";
      ctx.lineWidth = 20;
      ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

      ctx.fillStyle = "white";
      ctx.font = "bold 80px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("Certificate of Contribution", canvas.width / 2, 150);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 400, 180);
      ctx.lineTo(canvas.width / 2 + 400, 180);
      ctx.stroke();

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = avatarUrl;
      image.onload = () => {
        const imageSize = 200;
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 300, imageSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(image, canvas.width / 2 - imageSize / 2, 200, imageSize, imageSize);
        ctx.restore();

        ctx.font = "bold 50px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(username, canvas.width / 2, 500);

        ctx.font = "35px Arial";
        const content = `This certificate is proudly presented to ${username} for their valuable 
        contribution to watchkraft. Keep contributing. Best wishes for
        their future endeavors.`;
        const contentLines = content.split("\n");
        contentLines.forEach((line, index) => {
          ctx.fillText(line.trim(), canvas.width / 2, 600 + index * 40);
        });

        ctx.font = "italic 30px Georgia";
        ctx.fillText("Sangneel Deb", canvas.width / 1.5, 850);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 1.5 - 150, 860);
        ctx.lineTo(canvas.width / 1.5 + 150, 860);
        ctx.stroke();

        const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
        ctx.font = "25px Arial";
        ctx.fillText(`Generated on: ${date}`, canvas.width / 5, 900);

        const certWindow = window.open("", "_blank");
        certWindow.document.write(`
          <html>
            <head>
              <title>Certificate of Contribution</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  background-color: rgb(99, 95, 95);
                  padding: 20px;
                }
                h1 {
                  color: white;
                }
                img {
                  border: 10px solid rgb(15, 14, 13);
                  border-radius: 12px;
                  margin-top: 20px;
                  max-width: 100%;
                  height: auto;
                }
                .download-btn {
                  margin-top: 30px;
                  padding: 15px 30px;
                  background-color: black;
                  color: white;
                  font-size: 18px;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                }
                .download-btn:hover {
                  background-color: rgb(27, 24, 24);
                }
              </style>
            </head>
            <body>
              <h1>Certificate of Contribution</h1>
              <img src="${canvas.toDataURL("image/png")}" alt="Certificate" />
              <br />
              <button class="download-btn" onclick="downloadCertificate()">Download Certificate</button>
              <script>
                function downloadCertificate() {
                  const link = document.createElement('a');
                  link.download = '${username}_certificate.png';
                  link.href = "${canvas.toDataURL("image/png")}";
                  link.click();
                }
              </script>
            </body>
          </html>
        `);
      };
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to load contributors. Please try again.";
    contributorsContainer.appendChild(errorMessage);
  }
}

fetchContributors();
