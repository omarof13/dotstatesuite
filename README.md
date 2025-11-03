# 🚀 Deploying .Stat Suite on Azure Ubuntu VM

This repository provides a **Docker Compose setup** to easily run and explore the [.Stat Suite](https://sis-cc.gitlab.io/dotstatsuite-documentation/) ecosystem — now adapted for **Azure Ubuntu VMs** with **remote desktop (RDP)** and **Docker-based deployment**.

It allows developers, testers, and data professionals to deploy a complete .Stat Suite environment with all its components (backend, frontend, Keycloak, databases, and FMR Workbench) using Docker containers.

---

## 🧱 Overview

This setup is ideal for:
- Evaluating or experimenting with .Stat Suite components.
- Teaching and demonstration purposes.
- Testing integration with custom workflows.
- Building a foundation for future production deployments.

> **Note:** This demo configuration is intended for local or isolated testing environments.  
> For production, you must add SSL, security hardening, scaling, and data persistence.

---

## 🧩 1. Create the Azure Virtual Machine

### VM Configuration (Portal)

| Setting | Value |
|----------|--------|
| **Subscription** | Visual Studio Enterprise Subscription |
| **Resource Group** | `testing` |
| **VM Name** | `dotstatestuite2` |
| **Region** | (Canada) Canada Central |
| **Availability options** | No infrastructure redundancy required |
| **Security type** | Standard |
| **Image** | Ubuntu Server 22.04 LTS – x64 Gen2 |
| **VM architecture** | x64 |
| **Size** | Standard_D2s_v5 (2 vCPUs, 8 GiB RAM) |
| **OS Disk** | Standard SSD (default) |

### Network Configuration

Inbound ports to open:
- **SSH (22)** → For command-line access.
- **RDP (3389)** → For GUI remote access.

Click **Review + Create** → **Create**.

---

## 🧩 2. Connect via SSH

Once your VM is ready, connect using PowerShell or Git Bash:

```bash
ssh <username>@<Public-IP>
```

Example:
```bash
ssh jalal@4.205.212.9
```

---

## 🖥️ 3. Enable Remote Desktop (xRDP + Xfce)

Install a lightweight desktop environment and RDP support:

```bash
sudo apt update
sudo apt install xfce4 xfce4-goodies xrdp -y
echo xfce4-session > ~/.xsession
sudo systemctl enable xrdp
sudo systemctl start xrdp
```

You can now connect from **Windows Remote Desktop (mstsc)**:  
Enter your VM’s **public IP** and Ubuntu username/password.

---

## 🧩 4. Clone the Repository

```bash
git clone https://github.com/omarof13/dotstatesuite.git
```

---

## 🧰 5. Install Docker and Docker Compose

If a confirmation popup appears during setup, select **OK**.

```bash
# Update
sudo apt update && sudo apt upgrade -y

# Install Docker Engine
sudo apt install ca-certificates curl gnupg lsb-release -y
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Test installation
docker --version
docker compose version

sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
```

✅ The output should indicate `active (running)`.

---

## 🌐 6. Fix Docker Network Host Resolution

```bash
echo "DOCKER_OPTS='--add-host=host.docker.internal:host-gateway'" | sudo tee /etc/default/docker
sudo systemctl daemon-reload
sudo systemctl restart docker
echo "127.0.0.1 host.docker.internal" | sudo tee -a /etc/hosts
```

---

## 🔒 7. Configure Azure Networking (Ports 80–9000)

In the **Azure Portal** → VM → **Networking** → “+ Add inbound port rule”

| Setting | Value |
|----------|--------|
| **Destination port ranges** | 80-9000 |
| **Protocol** | TCP |
| **Action** | Allow |
| **Priority** | 1000 |
| **Name** | AllowPorts80to9000 |

---

## ⚙️ 8. Make All Shell Scripts Executable

```bash
cd ~/dotstatesuite
find . -type f -name "*.sh" -exec chmod +x {} \;
```

---

## 👤 9. Add User to Docker Group

```bash
sudo usermod -aG docker $USER
sudo reboot
```

After reboot, reconnect and confirm Docker access:

```bash
docker ps
```

✅ It should return an empty list (no permission errors).

---

## 🚀 10. Run the .Stat Suite Demo

```bash
cd ~/dotstatesuite/demo
./start.sh
```

This script automatically:
- Pulls all .Stat Suite Docker images.
- Generates configuration files under `/config/configs/`.
- Starts all services (backend, frontend, Keycloak, and FMR Workbench).

---

## 🖥️ 11. Access via Remote Desktop (RDP)

After startup completes, reconnect to your VM using Remote Desktop.

Inside the Xfce desktop, open a terminal and install **Firefox**:

```bash
sudo apt update
sudo apt install firefox -y
firefox &
```

✅ Firefox will start and be set as your default browser.

---

## 🔍 12. Test .Stat Suite Locally

In Firefox, open the following URLs:

| Service | URL | Default Credentials |
|----------|------|----------------------|
| Data Lifecycle Manager | [http://localhost:7000/](http://localhost:7000/) | test-admin / admin |
| Data Explorer | [http://localhost:7001/](http://localhost:7001/) | test-admin / admin |
| Fusion Metadata Registry (Workbench) | [http://localhost:8090/](http://localhost:8090/) | test-admin / admin |

---

## 🧱 13. Stopping the Environment

To stop all running containers:

```bash
./stop.sh
```

---

## 🧾 Troubleshooting

### FMR Workbench does not show schemes or dataflows
If the Workbench appears empty, restart the container:

```bash
docker restart fmr-workbench
```

Then refresh the browser — your schemes and dataflows should reappear.

---

## 📚 References

- Official Documentation: [https://sis-cc.gitlab.io/dotstatsuite-documentation/](https://sis-cc.gitlab.io/dotstatsuite-documentation/)
- Git Bash for Windows: [https://gitforwindows.org/](https://gitforwindows.org/)
- Azure Portal: [https://portal.azure.com](https://portal.azure.com)

---

## ✨ Summary

You now have a **fully operational .Stat Suite environment** running on an **Azure Ubuntu VM** with:
- SSH access for admin tasks
- RDP desktop via xRDP/Xfce
- Docker-based .Stat Suite deployment
- Web access to DLM, Explorer, Viewer, and FMR Workbench

**Happy .Stat Suiting!**

---

**Author:** Amarof Jalal  
**Version:** November 2025
