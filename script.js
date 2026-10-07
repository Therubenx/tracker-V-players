/* =========================================================
   V-TRACKER / FRONTEND DEMO
   - No backend
   - No database
   - No Riot account connection
   - Public image/data API used only for game artwork
========================================================= */

const players = {
    "shadowplayer#euw": {
        name: "ShadowPlayer",
        riotId: "ShadowPlayer#EUW",
        rank: "IMMORTAL 3",
        rr: "187 RR",
        kd: "1.34",
        winrate: "61.2%",
        acs: "267.4",
        hs: "28.4%"
    },

    "tenz#na1": {
        name: "TenZ",
        riotId: "TenZ#NA1",
        rank: "RADIANT",
        rr: "742 RR",
        kd: "1.51",
        winrate: "67.4%",
        acs: "301.7",
        hs: "31.8%"
    },

    "player#1234": {
        name: "Player",
        riotId: "Player#1234",
        rank: "DIAMOND 2",
        rr: "74 RR",
        kd: "1.08",
        winrate: "52.1%",
        acs: "224.3",
        hs: "24.1%"
    }
};

const skins = [
    {
        id: 1,
        name: "REAVER",
        weapon: "VANDAL",
        type: "vandal",
        color: "#762e48",
        favorite: true
    },
    {
        id: 2,
        name: "PRIME",
        weapon: "VANDAL",
        type: "vandal",
        color: "#b99b55",
        favorite: false
    },
    {
        id: 3,
        name: "ONI",
        weapon: "PHANTOM",
        type: "phantom",
        color: "#743a69",
        favorite: true
    },
    {
        id: 4,
        name: "SINGULARITY",
        weapon: "PHANTOM",
        type: "phantom",
        color: "#724bd4",
        favorite: false
    },
    {
        id: 5,
        name: "RGX 11Z PRO",
        weapon: "KNIFE",
        type: "knife",
        color: "#38c2b0",
        favorite: true
    },
    {
        id: 6,
        name: "REAVER",
        weapon: "KNIFE",
        type: "knife",
        color: "#762e48",
        favorite: false
    },
    {
        id: 7,
        name: "GLITCHPOP",
        weapon: "VANDAL",
        type: "vandal",
        color: "#e15fdb",
        favorite: false
    },
    {
        id: 8,
        name: "PRIME",
        weapon: "PHANTOM",
        type: "phantom",
        color: "#d4b86a",
        favorite: false
    },
    {
        id: 9,
        name: "ION",
        weapon: "PHANTOM",
        type: "phantom",
        color: "#4ba3e8",
        favorite: false
    },
    {
        id: 10,
        name: "SOVEREIGN",
        weapon: "VANDAL",
        type: "vandal",
        color: "#c99a3e",
        favorite: false
    },
    {
        id: 11,
        name: "KURONAMI",
        weapon: "KNIFE",
        type: "knife",
        color: "#b5b8c7",
        favorite: true
    },
    {
        id: 12,
        name: "CHAMPIONS",
        weapon: "VANDAL",
        type: "vandal",
        color: "#d5a849",
        favorite: false
    }
];

/* 5 avatars fijos. Puedes sustituir cada URL por assets/avatars/loquesea.webp */
const avatarOptions = [
    {
        id: 1,
        src: "https://api.dicebear.com/10.x/adventurer/svg?seed=VTracker-01"
    },
    {
        id: 2,
        src: "https://api.dicebear.com/10.x/adventurer/svg?seed=VTracker-02"
    },
    {
        id: 3,
        src: "https://api.dicebear.com/10.x/adventurer/svg?seed=VTracker-03"
    },
    {
        id: 4,
        src: "https://api.dicebear.com/10.x/adventurer/svg?seed=VTracker-04"
    },
    {
        id: 5,
        src: "https://api.dicebear.com/10.x/adventurer/svg?seed=VTracker-05"
    }
];

const STORAGE = {
    accounts: "vtracker_accounts_v3",
    session: "vtracker_session_v3",
    tracked: "vtracker_tracked_players_v3",
    guestSkins: "vtracker_skins_guest_v3"
};

const BASE_TRACKED_PLAYERS = 12842;
const VAL_API = "https://valorant-api.com/v1";

const lineupFallbackMaps = [
    "ASCENT",
    "BIND",
    "HAVEN",
    "SPLIT",
    "ICEBOX",
    "BREEZE",
    "FRACTURE",
    "PEARL",
    "LOTUS",
    "SUNSET",
    "ABYSS",
    "CORRODE",
    "SUMMIT"
];

const lineupFallbackAgents = [
    "ASTRA",
    "BREACH",
    "BRIMSTONE",
    "CHAMBER",
    "CLOVE",
    "CYPHER",
    "DEADLOCK",
    "FADE",
    "GEKKO",
    "HARBOR",
    "ISO",
    "JETT",
    "KAY/O",
    "KILLJOY",
    "MIKS",
    "NEON",
    "OMEN",
    "PHOENIX",
    "RAZE",
    "REYNA",
    "SAGE",
    "SKYE",
    "SOVA",
    "TEJO",
    "VETO",
    "VIPER",
    "VYSE",
    "WAYLAY",
    "YORU"
];

/*
=========================================================
DISTRIBUCIÓN REAL ESTIMADA DE RANGOS

Actualizada: 6 de octubre de 2026
Fuente: valking.gg

IMPORTANTE:
- Son datos estimados de un tracker de terceros.
- Riot no publica una tabla oficial global de distribución.
- Radiant se muestra aparte porque es un ranking limitado.
=========================================================
*/

const rankPercentages = {
    "IRON 1": 0.7,
    "IRON 2": 1.8,
    "IRON 3": 3.1,

    "BRONZE 1": 5.5,
    "BRONZE 2": 6.1,
    "BRONZE 3": 4.9,

    "SILVER 1": 7.7,
    "SILVER 2": 7.0,
    "SILVER 3": 6.1,

    "GOLD 1": 9.2,
    "GOLD 2": 7.5,
    "GOLD 3": 5.8,

    "PLATINUM 1": 7.6,
    "PLATINUM 2": 5.6,
    "PLATINUM 3": 4.1,

    "DIAMOND 1": 5.2,
    "DIAMOND 2": 3.7,
    "DIAMOND 3": 2.5,

    "ASCENDANT 1": 2.7,
    "ASCENDANT 2": 1.5,
    "ASCENDANT 3": 0.8,

    "IMMORTAL 1": 0.7,
    "IMMORTAL 2": 0.1,
    "IMMORTAL 3": 0.1,

    "RADIANT": 0.1
};

const rankDefinitions = [
    ["IRON", 1, 1],
    ["IRON", 2, 1],
    ["IRON", 3, 1],

    ["BRONZE", 1, 2],
    ["BRONZE", 2, 2],
    ["BRONZE", 3, 2],

    ["SILVER", 1, 3],
    ["SILVER", 2, 3],
    ["SILVER", 3, 3],

    ["GOLD", 1, 4],
    ["GOLD", 2, 4],
    ["GOLD", 3, 4],

    ["PLATINUM", 1, 5],
    ["PLATINUM", 2, 5],
    ["PLATINUM", 3, 5],

    ["DIAMOND", 1, 6],
    ["DIAMOND", 2, 6],
    ["DIAMOND", 3, 6],

    ["ASCENDANT", 1, 7],
    ["ASCENDANT", 2, 7],
    ["ASCENDANT", 3, 7],

    ["IMMORTAL", 1, 8],
    ["IMMORTAL", 2, 8],
    ["IMMORTAL", 3, 8],

    ["RADIANT", null, 9]
];

const lineups = [
    {
        id: 1,
        map: "ASCENT",
        agent: "JETT",
        title: "A Main → Heaven",
        site: "ATACANTE",
        position: "A SITE",
        description: "Lineup rápido para limpiar Heaven desde A Main.",
        video: ""
    },
    {
        id: 2,
        map: "ASCENT",
        agent: "SOVA",
        title: "Recon → A Default",
        site: "ATACANTE",
        position: "A SITE",
        description: "Recon Bolt para revelar Default y zonas cercanas.",
        video: ""
    },
    {
        id: 3,
        map: "BIND",
        agent: "VIPER",
        title: "B Long → B Default",
        site: "POST-PLANT",
        position: "B SITE",
        description: "Lineup de post-plant para jugar cómodamente desde B Long.",
        video: ""
    },
    {
        id: 4,
        map: "HAVEN",
        agent: "SOVA",
        title: "C Long → C Default",
        site: "ATACANTE",
        position: "C SITE",
        description: "Recon desde C Long para controlar el site.",
        video: ""
    },
    {
        id: 5,
        map: "LOTUS",
        agent: "KILLJOY",
        title: "A Main → A Default",
        site: "POST-PLANT",
        position: "A SITE",
        description: "Molly para cerrar el post-plant desde A Main.",
        video: ""
    },
    {
        id: 6,
        map: "SUNSET",
        agent: "GEKKO",
        title: "B Main → B Default",
        site: "POST-PLANT",
        position: "B SITE",
        description: "Utilidad para jugar el retake del spike desde distancia.",
        video: ""
    },
    {
        id: 7,
        map: "ICEBOX",
        agent: "VIPER",
        title: "A Belt → A Default",
        site: "POST-PLANT",
        position: "A SITE",
        description: "Lineup pensado para post-plant con cobertura desde Belt.",
        video: ""
    },
    {
        id: 8,
        map: "SPLIT",
        agent: "BRIMSTONE",
        title: "A Main → Default",
        site: "POST-PLANT",
        position: "A SITE",
        description: "Molly sencilla para cerrar rondas después de plantar.",
        video: ""
    }
];

const gameAssets = {
    agents: [],
    maps: [],
    ranks: [],
    skins: []
};

let toastTimeout = null;
let currentSkinFilter = "all";
let registerMode = false;
let currentUser = null;
let selectedAvatarId = 1;
let selectedLineupMap = "all";
let selectedLineupAgent = "all";

const $ = id => document.getElementById(id);

const profileSection = $("profile");
const searchInput = $("riotSearch");
const searchForm = $("searchForm");
const searchButton = $("searchButton");

const playerName = $("playerName");
const playerRiotId = $("playerRiotId");
const playerRank = $("playerRank");
const playerRR = $("playerRR");

const kd = $("kd");
const winrate = $("winrate");
const acs = $("acs");
const hs = $("hs");

const skinsGrid = $("skinsGrid");

const toast = $("toast");
const toastText = $("toastText");

function showToast(message, type = "success") {
    toastText.textContent = message;

    toast.classList.toggle(
        "error",
        type === "error"
    );

    toast.classList.add("active");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(
        () => toast.classList.remove("active"),
        3200
    );
}

function readJson(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch {
        return fallback;
    }
}

function writeJson(key, value) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

function formatNumber(value) {
    return new Intl.NumberFormat("es-ES").format(value);
}

function animateNumber(
    element,
    from,
    to,
    duration = 550
) {
    if (!element) return;

    if (from === to) {
        element.textContent = formatNumber(to);
        return;
    }

    const start = performance.now();
    const distance = to - from;

    function tick(now) {
        const progress = Math.min(
            (now - start) / duration,
            1
        );

        const eased =
            1 - Math.pow(1 - progress, 3);

        element.textContent = formatNumber(
            Math.round(
                from + distance * eased
            )
        );

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }

    requestAnimationFrame(tick);
}

function normalizeRiotId(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "");
}

function parseRiotId(raw) {
    const value = raw.trim();

    const match = value.match(
        /^(.+)#([^#]+)$/
    );

    if (!match) return null;

    return {
        name: match[1].trim(),
        tag: match[2].trim(),
        normalized: normalizeRiotId(value)
    };
}

function setAvatar(element, avatarId) {
    if (!element) return;

    const avatar =
        avatarOptions.find(
            item => item.id === Number(avatarId)
        ) || avatarOptions[0];

    const img = element.querySelector("img");
    const fallback = element.querySelector("span");

    if (!img || !fallback) return;

    img.classList.remove("loaded");

    img.src = avatar.src;

    img.onload = () => {
        img.classList.add("loaded");
        fallback.style.display = "none";
    };

    img.onerror = () => {
        img.removeAttribute("src");
        fallback.style.display = "grid";
    };
}

function updateAvatarUI(
    avatarId,
    username = "PLAYER"
) {
    setAvatar(
        $("navAvatarImage")?.parentElement,
        avatarId
    );

    setAvatar(
        $("profileAvatarImage")?.parentElement,
        avatarId
    );

    setAvatar(
        $("accountAvatarPreview")?.parentElement,
        avatarId
    );

    const initial =
        (username || "P")
            .charAt(0)
            .toUpperCase();

    $("navAvatarFallback").textContent =
        initial;

    $("profileAvatarFallback").textContent =
        initial;

    $("accountAvatarFallback").textContent =
        initial;
}

function getTrackedPlayers() {
    const value = readJson(
        STORAGE.tracked,
        []
    );

    return Array.isArray(value)
        ? value
        : [];
}

function getTrackedCount() {
    return (
        BASE_TRACKED_PLAYERS +
        getTrackedPlayers().length
    );
}

function updateTrackedCounters(
    previous = null
) {
    const count = getTrackedCount();

    const from =
        typeof previous === "number"
            ? previous
            : count;

    animateNumber(
        $("navTrackedCount"),
        from,
        count
    );

    animateNumber(
        $("heroTrackedCount"),
        from,
        count
    );
}

function registerTrackedPlayer(riotId) {
    const normalized =
        normalizeRiotId(riotId);

    const tracked =
        getTrackedPlayers();

    if (tracked.includes(normalized)) {
        return false;
    }

    tracked.push(normalized);

    writeJson(
        STORAGE.tracked,
        tracked
    );

    updateTrackedCounters(
        BASE_TRACKED_PLAYERS +
        tracked.length -
        1
    );

    return true;
}

function setSearchLoading(loading) {
    searchButton.disabled = loading;
    searchInput.disabled = loading;

    searchButton.textContent =
        loading
            ? "BUSCANDO..."
            : "BUSCAR";
}

function findAgent(name) {
    return gameAssets.agents.find(
        agent =>
            agent.displayName
                .toUpperCase() ===
            name.toUpperCase()
    ) || null;
}

function findMap(name) {
    return gameAssets.maps.find(
        map =>
            map.displayName
                .toUpperCase() ===
            name.toUpperCase()
    ) || null;
}

function findRank(name) {
    return gameAssets.ranks.find(
        rank =>
            rank.tierName &&
            rank.tierName
                .toUpperCase() ===
            name.toUpperCase()
    ) || null;
}

function updatePlayerGameAssets(player) {
    const rankAsset =
        findRank(player.rank);

    const rankImg =
        $("playerRankIcon");

    if (rankAsset && rankImg) {
        rankImg.src =
            rankAsset.largeIcon ||
            rankAsset.smallIcon ||
            "";

        rankImg.alt =
            player.rank;

        rankImg.style.visibility =
            "visible";
    } else if (rankImg) {
        rankImg.removeAttribute("src");
        rankImg.style.visibility =
            "hidden";
    }
}

function updateProfileVisuals() {
    document
        .querySelectorAll(".match-map-image")
        .forEach(img => {
            const asset =
                findMap(
                    img.dataset.mapImage ||
                    ""
                );

            if (asset) {
                img.src =
                    asset.splash ||
                    asset.displayIcon ||
                    "";
            }
        });

    document
        .querySelectorAll(
            ".match-agent-image,.profile-agent-thumb"
        )
        .forEach(img => {
            const asset =
                findAgent(
                    img.dataset.agentImage ||
                    ""
                );

            if (asset) {
                img.src =
                    asset.displayIconSmall ||
                    asset.displayIcon ||
                    asset.killfeedPortrait ||
                    "";
            }
        });

    const mainAgent =
        findAgent(
            $("mainAgentName")?.textContent ||
            "JETT"
        );

    if (mainAgent) {
        $("mainAgentPortrait").src =
            mainAgent.fullPortrait ||
            mainAgent.fullPortraitV2 ||
            mainAgent.bustPortrait ||
            "";

        $("mainAgentRole").textContent =
            (
                mainAgent.role?.displayName ||
                ""
            ).toUpperCase();
    }
}

async function fetchApi(path) {
    const response = await fetch(
        `${VAL_API}/${path}`,
        {
            headers: {
                Accept:
                    "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }

    const json =
        await response.json();

    return Array.isArray(json.data)
        ? json.data
        : [];
}

async function loadGameAssets() {
    try {
        const [
            agents,
            maps,
            ranks,
            weapons
        ] = await Promise.all([
            fetchApi("agents"),
            fetchApi("maps"),
            fetchApi("competitivetiers"),
            fetchApi("weapons")
        ]);

        gameAssets.agents =
            agents.filter(
                agent =>
                    agent.isPlayableCharacter !== false &&
                    agent.displayName &&
                    agent.displayIcon
            );

        gameAssets.maps =
            maps.filter(
                map =>
                    map.displayName &&
                    (
                        map.splash ||
                        map.displayIcon
                    )
            );

        gameAssets.ranks =
            ranks
                .flatMap(
                    group =>
                        Array.isArray(group.tiers)
                            ? group.tiers
                            : []
                )
                .filter(
                    tier =>
                        tier.tierName &&
                        (
                            tier.largeIcon ||
                            tier.smallIcon
                        )
                );

        gameAssets.skins =
            weapons.flatMap(
                weapon =>
                    (weapon.skins || [])
                        .map(
                            skin => ({
                                ...skin,
                                weaponName:
                                    weapon.displayName
                            })
                        )
            );

        renderRankList();
        renderLineupDropdowns();
        renderLineups();
        renderSkins();
        updateProfileVisuals();

        updatePlayerGameAssets({
            rank: playerRank.textContent
        });

    } catch (error) {
        console.warn(
            "No se pudieron cargar los assets del juego.",
            error
        );

        renderRankList();
        renderLineupDropdowns();
        renderLineups();
    }
}

function showPlayer(player) {
    playerName.textContent =
        player.name;

    playerRiotId.textContent =
        player.riotId;

    playerRank.textContent =
        player.rank;

    playerRR.textContent =
        player.rr;

    kd.textContent =
        player.kd;

    winrate.textContent =
        player.winrate;

    acs.textContent =
        player.acs;

    hs.textContent =
        player.hs;

    profileSection.classList.remove(
        "hidden"
    );

    updateAvatarUI(
        currentUser?.avatarId || 1,
        currentUser?.username ||
        player.name
    );

    updatePlayerGameAssets(
        player
    );

    profileSection.scrollIntoView({
        behavior: "smooth"
    });
}

function searchPlayer() {
    const parsed =
        parseRiotId(
            searchInput.value
        );

    if (!parsed) {
        showToast(
            "Introduce un Riot ID válido. Ej: TenZ#NA1",
            "error"
        );

        searchInput.focus();
        return;
    }

    setSearchLoading(true);

    setTimeout(() => {
        const player =
            players[
                parsed.normalized
            ];

        if (!player) {
            setSearchLoading(false);

            showToast(
                "Jugador no encontrado en el modo demo. Prueba ShadowPlayer#EUW, TenZ#NA1 o Player#1234.",
                "error"
            );

            return;
        }

        showPlayer(player);

        const added =
            registerTrackedPlayer(
                player.riotId
            );

        setSearchLoading(false);

        showToast(
            added
                ? `Perfil encontrado: ${player.riotId} · +1 tracked`
                : `Perfil encontrado: ${player.riotId}`
        );

    }, 420);
}

searchForm.addEventListener(
    "submit",
    event => {
        event.preventDefault();
        searchPlayer();
    }
);

document
    .querySelectorAll(
        "[data-demo-player]"
    )
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                searchInput.value =
                    button.dataset.demoPlayer;

                searchPlayer();
            }
        );
    });

const profileTabs =
    document.querySelectorAll(
        ".profile-tab"
    );

const profilePanels = {
    overview: $("overviewPanel"),
    matches: $("matchesPanel"),
    agents: $("agentsPanel"),
    collection: $("collectionPanel")
};

function openProfileTab(
    tabName,
    scroll = true
) {
    const tab =
        document.querySelector(
            `[data-tab="${tabName}"]`
        );

    const panel =
        profilePanels[tabName];

    if (!tab || !panel) return;

    profileTabs.forEach(
        item =>
            item.classList.toggle(
                "active",
                item === tab
            )
    );

    Object.values(
        profilePanels
    ).forEach(
        item =>
            item.classList.remove(
                "active"
            )
    );

    panel.classList.add(
        "active"
    );

    profileSection.classList.remove(
        "hidden"
    );

    if (scroll) {
        profileSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

profileTabs.forEach(
    tab =>
        tab.addEventListener(
            "click",
            () =>
                openProfileTab(
                    tab.dataset.tab,
                    false
                )
        )
);

function getSkinStorageKey() {
    return currentUser
        ? `vtracker_skins_user_${encodeURIComponent(
              currentUser.email.toLowerCase()
          )}`
        : STORAGE.guestSkins;
}

function resetSkins() {
    const defaults =
        new Set([
            1,
            3,
            5,
            11
        ]);

    skins.forEach(
        skin =>
            skin.favorite =
                defaults.has(
                    skin.id
                )
    );
}

function loadSkins() {
    resetSkins();

    const saved =
        readJson(
            getSkinStorageKey(),
            null
        );

    if (Array.isArray(saved)) {
        const ids =
            new Set(
                saved.map(Number)
            );

        skins.forEach(
            skin =>
                skin.favorite =
                    ids.has(
                        skin.id
                    )
        );
    }

    renderSkins();
}

function saveSkins() {
    writeJson(
        getSkinStorageKey(),
        skins
            .filter(
                skin =>
                    skin.favorite
            )
            .map(
                skin =>
                    skin.id
            )
    );
}

function findSkinAsset(skin) {
    const target =
        `${skin.name} ${skin.weapon}`
            .toUpperCase();

    let asset =
        gameAssets.skins.find(
            item =>
                (
                    item.displayName ||
                    ""
                ).toUpperCase() ===
                target
        );

    if (!asset) {
        asset =
            gameAssets.skins.find(
                item =>
                    (
                        item.displayName ||
                        ""
                    )
                        .toUpperCase()
                        .includes(
                            skin.name.toUpperCase()
                        ) &&
                    (
                        item.weaponName ||
                        ""
                    )
                        .toUpperCase() ===
                    skin.weapon.toUpperCase()
            );
    }

    if (!asset) {
        asset =
            gameAssets.skins.find(
                item =>
                    (
                        item.displayName ||
                        ""
                    )
                        .toUpperCase()
                        .includes(
                            skin.name.toUpperCase()
                        )
            );
    }

    return asset || null;
}

function renderSkins() {
    skinsGrid.innerHTML = "";

    const filtered =
        currentSkinFilter === "all"
            ? skins
            : skins.filter(
                  skin =>
                      skin.type ===
                      currentSkinFilter
              );

    filtered.forEach(
        skin => {
            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "skin-card";

            card.style.setProperty(
                "--skin-color",
                skin.color
            );

            const asset =
                findSkinAsset(skin);

            card.innerHTML = `
                <button
                    type="button"
                    class="${
                        skin.favorite
                            ? "favorite"
                            : ""
                    }"
                    aria-label="${
                        skin.favorite
                            ? "Quitar de favoritos"
                            : "Añadir a favoritos"
                    }"
                >
                    ${
                        skin.favorite
                            ? "★"
                            : "☆"
                    }
                </button>

                ${
                    asset?.displayIcon
                        ? `
                            <img
                                class="skin-image"
                                src="${asset.displayIcon}"
                                alt="${skin.name} ${skin.weapon}"
                                loading="lazy"
                            >
                        `
                        : ""
                }

                <span class="skin-type">
                    ${skin.weapon}
                </span>

                <h4>
                    ${skin.name}
                </h4>
            `;

            card
                .querySelector("button")
                .addEventListener(
                    "click",
                    () => {
                        skin.favorite =
                            !skin.favorite;

                        saveSkins();
                        renderSkins();

                        showToast(
                            skin.favorite
                                ? "Skin añadida a favoritos."
                                : "Skin eliminada de favoritos."
                        );
                    }
                );

            skinsGrid.appendChild(
                card
            );
        }
    );

    $("skinCount").textContent =
        skins.length;
}

document
    .querySelectorAll(
        ".skin-filter"
    )
    .forEach(
        button =>
            button.addEventListener(
                "click",
                () => {
                    document
                        .querySelectorAll(
                            ".skin-filter"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );

                    button.classList.add(
                        "active"
                    );

                    currentSkinFilter =
                        button.dataset.filter;

                    renderSkins();
                }
            )
    );

function getMapAssetNames() {
    const names =
        [
            ...new Set([
                ...lineupFallbackMaps,
                ...lineups.map(
                    item =>
                        item.map
                ),
                ...gameAssets.maps.map(
                    item =>
                        item.displayName.toUpperCase()
                )
            ])
        ];

    return names.filter(
        Boolean
    );
}

function getAgentAssetNames() {
    const names =
        [
            ...new Set([
                ...lineupFallbackAgents,
                ...lineups.map(
                    item =>
                        item.agent
                ),
                ...gameAssets.agents.map(
                    item =>
                        item.displayName.toUpperCase()
                )
            ])
        ];

    return names.filter(
        Boolean
    );
}

function assetForMapName(name) {
    return findMap(name) || null;
}

function assetForAgentName(name) {
    return findAgent(name) || null;
}

function renderLineupDropdowns() {
    renderLineupDropdown(
        "map"
    );

    renderLineupDropdown(
        "agent"
    );

    updateLineupSelectPreview(
        "map",
        selectedLineupMap
    );

    updateLineupSelectPreview(
        "agent",
        selectedLineupAgent
    );
}

function renderLineupDropdown(type) {
    const isMap =
        type === "map";

    const dropdown =
        isMap
            ? $("lineupMapDropdown")
            : $("lineupAgentDropdown");

    dropdown.innerHTML = "";

    const names =
        isMap
            ? getMapAssetNames()
            : getAgentAssetNames();

    const allOption =
        document.createElement(
            "button"
        );

    allOption.type =
        "button";

    allOption.className =
        `lineup-option ${
            isMap
                ? "option-map"
                : "option-agent"
        } active`;

    allOption.innerHTML = `
        <div class="lineup-option-copy">
            <small>FILTRO</small>
            <strong>
                Todos ${
                    isMap
                        ? "los mapas"
                        : "los agentes"
                }
            </strong>
        </div>
    `;

    allOption.addEventListener(
        "click",
        () =>
            selectLineupFilter(
                type,
                "all"
            )
    );

    dropdown.appendChild(
        allOption
    );

    names.forEach(
        name => {
            const asset =
                isMap
                    ? assetForMapName(
                          name
                      )
                    : assetForAgentName(
                          name
                      );

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                `lineup-option ${
                    isMap
                        ? "option-map"
                        : "option-agent"
                }`;

            const image =
                isMap
                    ? asset?.splash ||
                      asset?.displayIcon ||
                      ""
                    : asset?.displayIconSmall ||
                      asset?.displayIcon ||
                      "";

            const background =
                isMap
                    ? asset?.splash ||
                      asset?.displayIcon ||
                      ""
                    : asset?.background ||
                      asset?.displayIcon ||
                      "";

            button.innerHTML = `
                <span
                    class="lineup-option-bg"
                    style="
                        background-image:url('${background}')
                    "
                ></span>

                ${
                    image
                        ? `
                            <img
                                src="${image}"
                                alt="${name}"
                                loading="lazy"
                            >
                        `
                        : `
                            <span
                                style="
                                    position:relative;
                                    z-index:2;
                                    width:${
                                        isMap
                                            ? 62
                                            : 44
                                    }px;
                                    height:44px;
                                    background:#151822
                                "
                            ></span>
                        `
                }

                <span class="lineup-option-copy">
                    <small>
                        ${
                            isMap
                                ? "MAPA"
                                : (
                                      asset?.role
                                          ?.displayName ||
                                      "AGENTE"
                                  ).toUpperCase()
                        }
                    </small>

                    <strong>
                        ${name}
                    </strong>
                </span>
            `;

            if (
                (
                    isMap &&
                    selectedLineupMap === name
                ) ||
                (
                    !isMap &&
                    selectedLineupAgent === name
                )
            ) {
                button.classList.add(
                    "active"
                );
            }

            button.addEventListener(
                "click",
                () =>
                    selectLineupFilter(
                        type,
                        name
                    )
            );

            dropdown.appendChild(
                button
            );
        }
    );
}

function selectLineupFilter(
    type,
    value
) {
    if (type === "map") {
        selectedLineupMap =
            value;
    } else {
        selectedLineupAgent =
            value;
    }

    renderLineupDropdowns();
    closeLineupDropdowns();
    renderLineups();
}

function updateLineupSelectPreview(
    type,
    value
) {
    const isMap =
        type === "map";

    const button =
        isMap
            ? $("lineupMapButton")
            : $("lineupAgentButton");

    const text =
        isMap
            ? $("lineupMapText")
            : $("lineupAgentText");

    const img =
        isMap
            ? $("lineupMapPreview")
            : $("lineupAgentPreview");

    const bg =
        button.querySelector(
            ".select-preview-bg"
        );

    if (value === "all") {
        text.textContent =
            isMap
                ? "Todos los mapas"
                : "Todos los agentes";

        img.removeAttribute(
            "src"
        );

        bg.style.backgroundImage =
            "radial-gradient(circle, rgba(255,70,85,.22), transparent 65%)";

        return;
    }

    const asset =
        isMap
            ? assetForMapName(
                  value
              )
            : assetForAgentName(
                  value
              );

    text.textContent =
        value;

    const image =
        isMap
            ? asset?.splash ||
              asset?.displayIcon
            : asset?.displayIconSmall ||
              asset?.displayIcon;

    const background =
        isMap
            ? asset?.splash ||
              asset?.displayIcon
            : asset?.background ||
              asset?.displayIcon;

    if (image) {
        img.src = image;
    } else {
        img.removeAttribute(
            "src"
        );
    }

    if (background) {
        bg.style.backgroundImage =
            `url('${background}')`;
    }
}

function closeLineupDropdowns() {
    document
        .querySelectorAll(
            ".lineup-dropdown"
        )
        .forEach(
            dropdown =>
                dropdown.classList.remove(
                    "active"
                )
        );

    document
        .querySelectorAll(
            ".lineup-select"
        )
        .forEach(
            button =>
                button.setAttribute(
                    "aria-expanded",
                    "false"
                )
        );
}

function toggleLineupDropdown(
    buttonId,
    dropdownId
) {
    const button =
        $(buttonId);

    const dropdown =
        $(dropdownId);

    const active =
        dropdown.classList.contains(
            "active"
        );

    closeLineupDropdowns();

    if (!active) {
        dropdown.classList.add(
            "active"
        );

        button.setAttribute(
            "aria-expanded",
            "true"
        );
    }
}

$("lineupMapButton").addEventListener(
    "click",
    () =>
        toggleLineupDropdown(
            "lineupMapButton",
            "lineupMapDropdown"
        )
);

$("lineupAgentButton").addEventListener(
    "click",
    () =>
        toggleLineupDropdown(
            "lineupAgentButton",
            "lineupAgentDropdown"
        )
);

document.addEventListener(
    "click",
    event => {
        if (
            !event.target.closest(
                ".lineup-control"
            )
        ) {
            closeLineupDropdowns();
        }
    }
);

function createLineupVideo(
    lineup
) {
    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "lineup-video";

    const badges =
        document.createElement(
            "div"
        );

    badges.className =
        "lineup-badges";

    badges.innerHTML = `
        <span class="lineup-badge">
            ${lineup.map}
        </span>

        <span class="lineup-badge lineup-agent-badge">
            ${lineup.agent}
        </span>
    `;

    wrapper.appendChild(
        badges
    );

    if (lineup.video) {
        const video =
            document.createElement(
                "video"
            );

        video.controls = true;
        video.preload = "metadata";
        video.playsInline = true;
        video.src =
            lineup.video;

        wrapper.appendChild(
            video
        );

    } else {
        const placeholder =
            document.createElement(
                "div"
            );

        placeholder.className =
            "lineup-placeholder";

        placeholder.innerHTML = `
            <div class="lineup-placeholder-inner">
                <div class="lineup-play">
                    ▶
                </div>

                <strong>
                    VÍDEO PENDIENTE
                </strong>

                <span>
                    Añade tu MP4 a assets/lineups/
                </span>
            </div>
        `;

        wrapper.appendChild(
            placeholder
        );
    }

    return wrapper;
}

function renderLineups() {
    const filtered =
        lineups.filter(
            lineup =>
                (
                    selectedLineupMap === "all" ||
                    lineup.map ===
                        selectedLineupMap
                ) &&
                (
                    selectedLineupAgent === "all" ||
                    lineup.agent ===
                        selectedLineupAgent
                )
        );

    lineupsGrid.innerHTML =
        "";

    $("lineupsResultCount").textContent =
        filtered.length;

    lineupsEmpty.classList.toggle(
        "hidden",
        filtered.length !== 0
    );

    filtered.forEach(
        lineup => {
            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "lineup-card";

            card.appendChild(
                createLineupVideo(
                    lineup
                )
            );

            const body =
                document.createElement(
                    "div"
                );

            body.className =
                "lineup-body";

            body.innerHTML = `
                <div class="lineup-title-row">
                    <h3>
                        ${lineup.title}
                    </h3>

                    <span class="lineup-site">
                        ${lineup.site}
                    </span>
                </div>

                <p>
                    ${lineup.description}
                </p>

                <div class="lineup-meta">
                    <span>
                        ${lineup.map}
                    </span>

                    <span>
                        ${lineup.agent}
                    </span>

                    <span>
                        ${lineup.position}
                    </span>
                </div>
            `;

            card.appendChild(
                body
            );

            lineupsGrid.appendChild(
                card
            );
        }
    );
}

/* =========================================================
   RANKING
========================================================= */

function renderRankList() {
    const rankList =
        $("rankList");

    rankList.innerHTML =
        "";

    rankDefinitions.forEach(
        ([base, level, colorClass]) => {
            const name =
                level
                    ? `${base} ${level}`
                    : base;

            const asset =
                findRank(name) ||
                findRank(base);

            /*
             * Aquí usamos directamente el porcentaje
             * correspondiente a cada división.
             *
             * Antes se dividía el porcentaje del tier
             * entre 3, lo cual era solo aproximado.
             */
            const percentage =
                rankPercentages[name] ??
                0;

            /*
             * Escalamos visualmente la barra.
             * El porcentaje real sigue siendo el que
             * aparece a la derecha.
             */
            const width =
                Math.max(
                    2,
                    Math.min(
                        100,
                        percentage * 10
                    )
                );

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                `rank-row rank-tier-${colorClass}`;

            row.innerHTML = `
                <div class="rank-name">
                    ${
                        asset?.smallIcon ||
                        asset?.largeIcon
                            ? `
                                <img
                                    class="rank-icon"
                                    src="${
                                        asset.smallIcon ||
                                        asset.largeIcon
                                    }"
                                    alt="${name}"
                                    loading="lazy"
                                >
                            `
                            : `
                                <span class="rank-icon"></span>
                            `
                    }

                    <span>
                        ${name}
                    </span>
                </div>

                <div class="rank-bar">
                    <span
                        style="width:${width}%"
                    ></span>
                </div>

                <strong>
                    ${
                        percentage < 0.1
                            ? percentage.toFixed(2)
                            : percentage.toFixed(1)
                    }%
                </strong>
            `;

            rankList.appendChild(
                row
            );
        }
    );
}

/* =========================================================
   AUTH DEMO
========================================================= */

const authModal =
    $("authModal");

const openLogin =
    $("openLogin");

const closeModal =
    $("closeModal");

const switchAuth =
    $("switchAuth");

const authForm =
    $("authForm");

const authTitle =
    $("authTitle");

const authSubtitle =
    $("authSubtitle");

const usernameField =
    $("usernameField");

const usernameInput =
    $("usernameInput");

const emailInput =
    $("emailInput");

const passwordInput =
    $("passwordInput");

function openAuth() {
    authModal.classList.add(
        "active"
    );

    emailInput.focus();
}

function closeAuth() {
    authModal.classList.remove(
        "active"
    );
}

function setAuthMode(register) {
    registerMode =
        register;

    authTitle.textContent =
        register
            ? "CREAR CUENTA"
            : "INICIAR SESIÓN";

    authSubtitle.textContent =
        register
            ? "Crea una cuenta demo local para guardar tu avatar, usuario y colección."
            : "Entra a tu cuenta demo para cargar tu avatar y tu colección.";

    usernameField.hidden =
        !register;

    usernameInput.required =
        register;

    passwordInput.autocomplete =
        register
            ? "new-password"
            : "current-password";

    switchAuth.innerHTML =
        register
            ? "¿Ya tienes cuenta? <strong>Iniciar sesión</strong>"
            : "¿No tienes cuenta? <strong>Crear cuenta</strong>";
}

openLogin.addEventListener(
    "click",
    () => {
        setAuthMode(false);
        openAuth();
    }
);

closeModal.addEventListener(
    "click",
    closeAuth
);

authModal.addEventListener(
    "click",
    event => {
        if (
            event.target ===
            authModal
        ) {
            closeAuth();
        }
    }
);

switchAuth.addEventListener(
    "click",
    () =>
        setAuthMode(
            !registerMode
        )
);

function normalizeUsername(
    value
) {
    return value
        .trim()
        .replace(
            /[^a-zA-Z0-9_-]/g,
            ""
        )
        .slice(0, 24);
}

async function hashPassword(
    password
) {
    if (window.crypto?.subtle) {
        const digest =
            await window.crypto.subtle.digest(
                "SHA-256",
                new TextEncoder().encode(
                    password
                )
            );

        return [
            ...new Uint8Array(
                digest
            )
        ]
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(
                            2,
                            "0"
                        )
            )
            .join("");
    }

    let hash = 2166136261;

    for (
        let i = 0;
        i < password.length;
        i++
    ) {
        hash ^=
            password.charCodeAt(
                i
            );

        hash = Math.imul(
            hash,
            16777619
        );
    }

    return `demo-${(
        hash >>> 0
    ).toString(16)}`;
}

function getAccounts() {
    const accounts =
        readJson(
            STORAGE.accounts,
            []
        );

    return Array.isArray(
        accounts
    )
        ? accounts
        : [];
}

function saveAccounts(
    accounts
) {
    writeJson(
        STORAGE.accounts,
        accounts
    );
}

function getAccountByEmail(
    email
) {
    const normalized =
        email
            .trim()
            .toLowerCase();

    return (
        getAccounts().find(
            account =>
                account.email ===
                normalized
        ) || null
    );
}

function createAccount(
    account
) {
    const accounts =
        getAccounts();

    accounts.push(
        account
    );

    saveAccounts(
        accounts
    );
}

function loginUser(account) {
    currentUser =
        account;

    writeJson(
        STORAGE.session,
        {
            email: account.email
        }
    );

    openLogin.classList.add(
        "hidden"
    );

    $("profileButton")
        .classList.remove(
            "hidden"
        );

    $("navUsername").textContent =
        account.username.toUpperCase();

    updateAvatarUI(
        account.avatarId,
        account.username
    );

    loadSkins();
}

function closeAccount() {
    $("accountModal")
        .classList.remove(
            "active"
        );
}

function logoutUser() {
    currentUser =
        null;

    localStorage.removeItem(
        STORAGE.session
    );

    openLogin.classList.remove(
        "hidden"
    );

    $("profileButton")
        .classList.add(
            "hidden"
        );

    updateAvatarUI(
        1,
        "PLAYER"
    );

    loadSkins();
    closeAccount();

    showToast(
        "Sesión cerrada."
    );
}

authForm.addEventListener(
    "submit",
    async event => {
        event.preventDefault();

        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;

        const username =
            normalizeUsername(
                usernameInput.value
            );

        if (
            !email ||
            !password ||
            (
                registerMode &&
                !username
            )
        ) {
            showToast(
                "Completa todos los campos.",
                "error"
            );

            return;
        }

        if (
            password.length < 6
        ) {
            showToast(
                "La contraseña debe tener al menos 6 caracteres.",
                "error"
            );

            return;
        }

        const submit =
            authForm.querySelector(
                "button[type=submit]"
            );

        submit.disabled = true;

        submit.textContent =
            registerMode
                ? "CREANDO..."
                : "ENTRANDO...";

        try {
            const passwordHash =
                await hashPassword(
                    password
                );

            const existing =
                getAccountByEmail(
                    email
                );

            if (registerMode) {
                if (existing) {
                    throw new Error(
                        "EMAIL_EXISTS"
                    );
                }

                const account = {
                    id:
                        window.crypto?.randomUUID?.() ||
                        `demo-${Date.now()}`,

                    username,
                    email,
                    passwordHash,
                    avatarId:
                        selectedAvatarId,

                    createdAt:
                        new Date().toISOString()
                };

                createAccount(
                    account
                );

                loginUser(
                    account
                );

                closeAuth();

                authForm.reset();

                showToast(
                    "Cuenta demo creada correctamente."
                );

                return;
            }

            if (
                !existing ||
                existing.passwordHash !==
                    passwordHash
            ) {
                throw new Error(
                    "INVALID_LOGIN"
                );
            }

            loginUser(
                existing
            );

            closeAuth();

            authForm.reset();

            showToast(
                "Sesión iniciada."
            );

        } catch (error) {
            if (
                error.message ===
                "EMAIL_EXISTS"
            ) {
                showToast(
                    "Ese email ya tiene una cuenta en este navegador.",
                    "error"
                );
            } else if (
                error.message ===
                "INVALID_LOGIN"
            ) {
                showToast(
                    "Email o contraseña incorrectos.",
                    "error"
                );
            } else {
                console.error(
                    error
                );

                showToast(
                    "No se pudo completar la operación.",
                    "error"
                );
            }
        } finally {
            submit.disabled =
                false;

            submit.textContent =
                "CONTINUAR";
        }
    }
);

/* =========================================================
   ACCOUNT / AVATARS
========================================================= */

const accountModal =
    $("accountModal");

const profileButton =
    $("profileButton");

const accountUsernameInput =
    $("accountUsernameInput");

const avatarGrid =
    $("avatarGrid");

function renderAvatarPicker() {
    avatarGrid.innerHTML =
        "";

    avatarOptions.forEach(
        avatar => {
            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                `avatar-option ${
                    selectedAvatarId ===
                    avatar.id
                        ? "active"
                        : ""
                }`;

            button.setAttribute(
                "aria-label",
                `Elegir avatar ${avatar.id}`
            );

            button.innerHTML = `
                <img
                    src="${avatar.src}"
                    alt="Avatar ${avatar.id}"
                >

                <span>
                    ${avatar.id}
                </span>
            `;

            button.addEventListener(
                "click",
                () => {
                    selectedAvatarId =
                        avatar.id;

                    document
                        .querySelectorAll(
                            ".avatar-option"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );

                    button.classList.add(
                        "active"
                    );

                    setAvatar(
                        $("accountAvatarPreview")
                            .parentElement,
                        selectedAvatarId
                    );
                }
            );

            avatarGrid.appendChild(
                button
            );
        }
    );
}

function refreshAccountPreview() {
    if (!currentUser)
        return;

    $("accountUsernamePreview").textContent =
        currentUser.username;

    $("accountEmailPreview").textContent =
        currentUser.email;

    accountUsernameInput.value =
        currentUser.username;

    selectedAvatarId =
        Number(
            currentUser.avatarId ||
            1
        );

    updateAvatarUI(
        selectedAvatarId,
        currentUser.username
    );

    renderAvatarPicker();
}

function openAccount() {
    if (!currentUser)
        return;

    refreshAccountPreview();

    accountModal.classList.add(
        "active"
    );
}

profileButton.addEventListener(
    "click",
    openAccount
);

$("closeAccountModal")
    .addEventListener(
        "click",
        closeAccount
    );

accountModal.addEventListener(
    "click",
    event => {
        if (
            event.target ===
            accountModal
        ) {
            closeAccount();
        }
    }
);

$("saveAccountButton")
    .addEventListener(
        "click",
        () => {
            if (!currentUser)
                return;

            const username =
                normalizeUsername(
                    accountUsernameInput.value
                );

            if (!username) {
                showToast(
                    "El nombre de usuario no puede estar vacío.",
                    "error"
                );

                return;
            }

            const accounts =
                getAccounts();

            const index =
                accounts.findIndex(
                    account =>
                        account.email ===
                        currentUser.email
                );

            if (index === -1) {
                showToast(
                    "No se encontró la cuenta demo.",
                    "error"
                );

                return;
            }

            accounts[index] = {
                ...accounts[index],
                username,
                avatarId:
                    selectedAvatarId
            };

            saveAccounts(
                accounts
            );

            currentUser =
                accounts[index];

            $("navUsername")
                .textContent =
                username.toUpperCase();

            updateAvatarUI(
                selectedAvatarId,
                username
            );

            closeAccount();

            showToast(
                "Perfil actualizado."
            );
        }
    );

$("signOutButton")
    .addEventListener(
        "click",
        logoutUser
    );

/* =========================================================
   NAVIGATION
========================================================= */

$("mobileMenuButton")
    .addEventListener(
        "click",
        () =>
            $("mobileNav")
                .classList.toggle(
                    "active"
                )
    );

document
    .querySelectorAll(
        "#mobileNav a"
    )
    .forEach(
        link =>
            link.addEventListener(
                "click",
                event => {
                    const href =
                        link.getAttribute(
                            "href"
                        );

                    $("mobileNav")
                        .classList.remove(
                            "active"
                        );

                    if (
                        href ===
                        "#matches"
                    ) {
                        event.preventDefault();

                        openProfileTab(
                            "matches"
                        );
                    }
                }
            )
    );

document
    .querySelectorAll(
        '.desktop-nav a[href="#matches"]'
    )
    .forEach(
        link =>
            link.addEventListener(
                "click",
                event => {
                    event.preventDefault();

                    openProfileTab(
                        "matches"
                    );
                }
            )
    );

$("collectionButton")
    .addEventListener(
        "click",
        () =>
            openProfileTab(
                "collection"
            )
    );

document.addEventListener(
    "keydown",
    event => {
        if (
            event.key !==
            "Escape"
        ) {
            return;
        }

        closeAuth();
        closeAccount();
        closeLineupDropdowns();
    }
);

function restoreSession() {
    const session =
        readJson(
            STORAGE.session,
            null
        );

    if (!session?.email)
        return;

    const account =
        getAccountByEmail(
            session.email
        );

    if (!account) {
        localStorage.removeItem(
            STORAGE.session
        );

        return;
    }

    currentUser =
        account;

    openLogin.classList.add(
        "hidden"
    );

    $("profileButton")
        .classList.remove(
            "hidden"
        );

    $("navUsername")
        .textContent =
        account.username.toUpperCase();

    updateAvatarUI(
        account.avatarId,
        account.username
    );

    loadSkins();
}

/* =========================================================
   INITIALIZATION
========================================================= */

updateTrackedCounters();

renderAvatarPicker();

updateAvatarUI(
    1,
    "PLAYER"
);

loadSkins();

renderRankList();

renderLineupDropdowns();

renderLineups();

restoreSession();

loadGameAssets();