# .Stat Suite Docker Compose

This repository provides a **Docker Compose setup** to easily run and explore the [.Stat Suite](https://sis-cc.gitlab.io/dotstatsuite-documentation/) ecosystem locally. It allows developers, testers, and data professionals to deploy a complete .Stat Suite environment with all its components (backend, frontend, Keycloak, databases, and FMR Workbench) using Docker containers.

The compose setup is preconfigured for a **demo environment**, ideal for evaluation, experimentation, or integration testing. It automatically provisions the required services and connects them together to provide a fully functional .Stat instance running locally.

> **Note:** This demo configuration is intended for local use only. For production deployments, additional configurations such as scaling, SSL, security, and external data persistence must be implemented separately.

---

## 🚀 Quick Start

### 1. Open Git Bash on Windows

If you're on Windows, install **[Git Bash](https://gitforwindows.org/)** (recommended terminal to run shell scripts).

### 2. Navigate to the demo folder

```bash
cd demo
```

### 3. Start the .Stat Suite demo environment

Run the startup script:

```bash
./start.sh
```

This will launch the default demo setup using SQL Server as the backend and local host configuration.

---

## 🧩 What Happens

* Docker images for all .Stat Suite components (backend, frontend, Keycloak, and FMR Workbench) are pulled and started.
* The configuration is generated under the `demo/config/` directory.
* All services become accessible locally (e.g. Data Lifecycle Manager, Data Explorer, Data Viewer, etc.).

Once startup completes, you can access the web interfaces at:

* **FMR Workbench:** [http://localhost:8090/](http://localhost:8090/)
* **Data Lifecycle Manager:** [http://localhost:7000/](http://localhost:7000/)
* **Data Explorer:** [http://localhost:7001/](http://localhost:7001/)
* **Data Viewer:** [http://localhost:7002/](http://localhost:7002/)
* **Keycloak Admin Console:** [http://localhost:8080/](http://localhost:8080/)

---

## 🧱 Stopping the Environment

To stop all running containers:

```bash
./stop.sh
```

---

## 🧰 Troubleshooting

### 🧾 Scenario: FMR Workbench not showing schemes or dataflows

If the **FMR Workbench** does not display the **schemes** or **dataflows** that were previously created in the **Data Lifecycle Manager**, it usually means the container has lost sync with the backend services.

To fix this, simply **restart the `fmr-workbench` container**.

#### Option 1 — Restart via Docker Desktop

1. Open **Docker Desktop**.
2. Go to the **Containers** tab.
3. Locate the container named `fmr-workbench`.
4. Click the **Restart** button (⟳ icon) next to it.

This will stop and relaunch the container, reinitializing its internal cache.

#### Option 2 — Restart via Command Line

Open a terminal (e.g., Git Bash or PowerShell) and run:

```bash
docker restart fmr-workbench
```

You should see:

```
fmr-workbench
```

indicating a successful restart.

After restarting, refresh the **FMR Workbench** UI in your browser — the schemes and dataflows should reappear.

---

## 📚 References

* Official documentation: [https://sis-cc.gitlab.io/dotstatsuite-documentation/](https://sis-cc.gitlab.io/dotstatsuite-documentation/)
* Git Bash for Windows: [https://gitforwindows.org/](https://gitforwindows.org/)

---

**End of README**
