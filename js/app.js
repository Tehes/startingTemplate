/* --------------------------------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------------------------------*/

/* --------------------------------------------------------------------------------------------------
Variables
---------------------------------------------------------------------------------------------------*/

/* --------------------------------------------------------------------------------------------------
functions
---------------------------------------------------------------------------------------------------*/

function init() {
	// The following touchstart event listener was used as a workaround for older iOS devices
	// to prevent a 300ms delay in touch interactions. It is likely not necessary anymore
	// on modern devices and browsers, especially in Progressive Web Apps.
	// If you experience issues with touch interactions, you can uncomment it again.
	// document.addEventListener("touchstart", function() {}, false);
}

/* --------------------------------------------------------------------------------------------------
public members, exposed with return statement
---------------------------------------------------------------------------------------------------*/
globalThis.app = {
	init,
};

globalThis.app.init();

/* --------------------------------------------------------------------------------------------------
Service Worker configuration. Toggle 'useServiceWorker' to enable or disable the Service Worker.
---------------------------------------------------------------------------------------------------*/
const useServiceWorker = false; // set to 'true' to enable the Service Worker
const serviceWorkerVersion = "2025-12-13-v1"; // update this to force new SW installation

async function registerServiceWorker() {
	try {
		const registration = await navigator.serviceWorker.register(
			`./service-worker.js?v=${serviceWorkerVersion}`,
			{ scope: "./", updateViaCache: "none" },
		);
		// watch for updates right away
		registration.update();
		console.log("Service Worker registered with scope:", registration.scope);
	} catch (error) {
		console.log("Service Worker registration failed:", error);
	}
}

async function unregisterServiceWorkers() {
	const registrations = await navigator.serviceWorker.getRegistrations();
	if (registrations.length) {
		await Promise.all(registrations.map((r) => r.unregister()));
	}

	// Clear caches
	if ("caches" in globalThis) {
		const keys = await caches.keys();
		await Promise.all(keys.map((k) => caches.delete(k)));
	}

	console.log("All service workers & caches cleared – reloading page…");
	globalThis.location.reload();
}

if ("serviceWorker" in navigator) {
	// Remember if a controller existed at startup to suppress reload on first install
	const hadControllerAtStart = !!navigator.serviceWorker.controller;
	// Auto reload only once when a new SW takes control
	let hasReloadedForSW = false;
	navigator.serviceWorker.addEventListener("controllerchange", () => {
		// Do not reload on very first install (no controller existed at start)
		if (!hadControllerAtStart) return;
		if (hasReloadedForSW) return;
		hasReloadedForSW = true;
		globalThis.location.reload();
	});

	globalThis.addEventListener("DOMContentLoaded", async () => {
		if (useServiceWorker) {
			await registerServiceWorker();
		} else {
			await unregisterServiceWorkers();
		}
	});
}
