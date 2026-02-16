"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Bezirksverband,
  FahrschulAd,
  FeeRow,
  FooterContent,
  NewsArticle,
  Offer,
  Seminar,
  SiteSettings,
  WebsiteNav,
} from "@/lib/mockData";
import {
  initialBezirksverbaende,
  initialFahrschulAds,
  initialFooterContent,
  initialMembershipFees,
  initialNews,
  initialOffers,
  initialSeminars,
  initialSettings,
  initialWebsiteNav,
} from "@/lib/mockData";

const STORAGE_KEYS = {
  news: "lsf_news",
  seminars: "lsf_seminars",
  ads: "lsf_ads",
  settings: "lsf_settings",
  membershipFees: "lsf_membershipFees",
  websiteNav: "lsf_websiteNav",
  footerContent: "lsf_footerContent",
  offers: "lsf_offers",
  lastSync: "lsf_lastSync",
} as const;

// Persistenz: API unter /api/content/[type] (news, seminars, fahrschulmarkt, membership-fees, settings)
// steht bereit; Context nutzt aktuell localStorage. Migration: Daten aus API laden (GET),
// Änderungen per POST zurückschreiben.

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export interface SiteDataContextType {
  news: NewsArticle[];
  seminars: Seminar[];
  fahrschulAds: FahrschulAd[];
  bezirksverbaende: Bezirksverband[];
  settings: SiteSettings;
  membershipFees: FeeRow[];
  lastSync: string;

  addNews: (
    article: Omit<NewsArticle, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateNews: (id: string, updates: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  addSeminar: (seminar: Omit<Seminar, "id">) => void;
  updateSeminar: (id: string, updates: Partial<Seminar>) => void;
  deleteSeminar: (id: string) => void;

  addFahrschulAd: (ad: Omit<FahrschulAd, "id">) => void;
  updateFahrschulAd: (id: string, updates: Partial<FahrschulAd>) => void;
  deleteFahrschulAd: (id: string) => void;

  updateSettings: (updates: Partial<SiteSettings>) => void;

  setMembershipFees: (fees: FeeRow[]) => void;
  updateFeeRow: (id: string, updates: Partial<FeeRow>) => void;
  addFeeRow: () => void;
  deleteFeeRow: (id: string) => void;

  websiteNav: WebsiteNav;
  setWebsiteNav: (nav: WebsiteNav) => void;
  footerContent: FooterContent;
  setFooterContent: (content: Partial<FooterContent>) => void;
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  addOffer: () => void;
  deleteOffer: (id: string) => void;
}

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsArticle[]>(() =>
    loadFromStorage(STORAGE_KEYS.news, initialNews)
  );
  const [seminars, setSeminars] = useState<Seminar[]>(() =>
    loadFromStorage(STORAGE_KEYS.seminars, initialSeminars)
  );
  const [fahrschulAds, setFahrschulAds] = useState<FahrschulAd[]>(() =>
    loadFromStorage(STORAGE_KEYS.ads, initialFahrschulAds)
  );
  const [settings, setSettings] = useState<SiteSettings>(() =>
    loadFromStorage(STORAGE_KEYS.settings, initialSettings)
  );
  const [membershipFees, setMembershipFeesState] = useState<FeeRow[]>(() =>
    loadFromStorage(STORAGE_KEYS.membershipFees, initialMembershipFees)
  );
  const [websiteNav, setWebsiteNavState] = useState<WebsiteNav>(() =>
    loadFromStorage(STORAGE_KEYS.websiteNav, initialWebsiteNav)
  );
  const [footerContent, setFooterContentState] = useState<FooterContent>(() =>
    loadFromStorage(STORAGE_KEYS.footerContent, initialFooterContent)
  );
  const [offers, setOffersState] = useState<Offer[]>(() =>
    loadFromStorage(STORAGE_KEYS.offers, initialOffers)
  );
  const [lastSync, setLastSync] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.lastSync, new Date().toISOString())
  );

  const bezirksverbaende = initialBezirksverbaende;

  const persist = useCallback(
    (key: string, value: unknown) => {
      saveToStorage(key, value);
      setLastSync(new Date().toISOString());
      saveToStorage(STORAGE_KEYS.lastSync, new Date().toISOString());
    },
    []
  );

  const setMembershipFees = useCallback(
    (fees: FeeRow[]) => {
      setMembershipFeesState(fees);
      persist(STORAGE_KEYS.membershipFees, fees);
    },
    [persist]
  );

  const updateFeeRow = useCallback(
    (id: string, updates: Partial<FeeRow>) => {
      setMembershipFeesState((prev) => {
        const next = prev.map((r) => (r.id === id ? { ...r, ...updates } : r));
        persist(STORAGE_KEYS.membershipFees, next);
        return next;
      });
    },
    [persist]
  );

  const addFeeRow = useCallback(() => {
    const newRow: FeeRow = {
      id: `fee-${generateId()}`,
      label: "",
      betrag: "",
      hinweis: null,
    };
    setMembershipFeesState((prev) => {
      const next = [...prev, newRow];
      persist(STORAGE_KEYS.membershipFees, next);
      return next;
    });
  }, [persist]);

  const deleteFeeRow = useCallback(
    (id: string) => {
      setMembershipFeesState((prev) => {
        const next = prev.filter((r) => r.id !== id);
        persist(STORAGE_KEYS.membershipFees, next);
        return next;
      });
    },
    [persist]
  );

  const setWebsiteNav = useCallback(
    (nav: WebsiteNav) => {
      setWebsiteNavState(nav);
      persist(STORAGE_KEYS.websiteNav, nav);
    },
    [persist]
  );

  const setFooterContent = useCallback(
    (updates: Partial<FooterContent>) => {
      setFooterContentState((prev) => {
        const next = { ...prev, ...updates };
        persist(STORAGE_KEYS.footerContent, next);
        return next;
      });
    },
    [persist]
  );

  const setOffers = useCallback(
    (list: Offer[]) => {
      setOffersState(list);
      persist(STORAGE_KEYS.offers, list);
    },
    [persist]
  );

  const updateOffer = useCallback(
    (id: string, updates: Partial<Offer>) => {
      setOffersState((prev) => {
        const next = prev.map((o) => (o.id === id ? { ...o, ...updates } : o));
        persist(STORAGE_KEYS.offers, next);
        return next;
      });
    },
    [persist]
  );

  const addOffer = useCallback(() => {
    setOffersState((prev) => {
      const newOffer: Offer = {
        id: `off-${generateId()}`,
        title: "",
        text: "",
        order: prev.length + 1,
      };
      const next = [...prev, newOffer];
      persist(STORAGE_KEYS.offers, next);
      return next;
    });
  }, [persist]);

  const deleteOffer = useCallback(
    (id: string) => {
      setOffersState((prev) => {
        const next = prev.filter((o) => o.id !== id);
        persist(STORAGE_KEYS.offers, next);
        return next;
      });
    },
    [persist]
  );

  const addNews = useCallback(
    (article: Omit<NewsArticle, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newArticle: NewsArticle = {
        ...article,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setNews((prev) => {
        const next = [newArticle, ...prev];
        persist(STORAGE_KEYS.news, next);
        return next;
      });
    },
    [persist]
  );

  const updateNews = useCallback(
    (id: string, updates: Partial<NewsArticle>) => {
      setNews((prev) => {
        const next = prev.map((a) =>
          a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
        );
        persist(STORAGE_KEYS.news, next);
        return next;
      });
    },
    [persist]
  );

  const deleteNews = useCallback(
    (id: string) => {
      setNews((prev) => {
        const next = prev.filter((a) => a.id !== id);
        persist(STORAGE_KEYS.news, next);
        return next;
      });
    },
    [persist]
  );

  const addSeminar = useCallback(
    (seminar: Omit<Seminar, "id">) => {
      const newSeminar: Seminar = { ...seminar, id: generateId() };
      setSeminars((prev) => {
        const next = [newSeminar, ...prev];
        persist(STORAGE_KEYS.seminars, next);
        return next;
      });
    },
    [persist]
  );

  const updateSeminar = useCallback(
    (id: string, updates: Partial<Seminar>) => {
      setSeminars((prev) => {
        const next = prev.map((s) => (s.id === id ? { ...s, ...updates } : s));
        persist(STORAGE_KEYS.seminars, next);
        return next;
      });
    },
    [persist]
  );

  const deleteSeminar = useCallback(
    (id: string) => {
      setSeminars((prev) => {
        const next = prev.filter((s) => s.id !== id);
        persist(STORAGE_KEYS.seminars, next);
        return next;
      });
    },
    [persist]
  );

  const addFahrschulAd = useCallback(
    (ad: Omit<FahrschulAd, "id">) => {
      const newAd: FahrschulAd = {
        ...ad,
        id: generateId(),
        date: new Date().toISOString().slice(0, 10),
      };
      setFahrschulAds((prev) => {
        const next = [newAd, ...prev];
        persist(STORAGE_KEYS.ads, next);
        return next;
      });
    },
    [persist]
  );

  const updateFahrschulAd = useCallback(
    (id: string, updates: Partial<FahrschulAd>) => {
      setFahrschulAds((prev) => {
        const next = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
        persist(STORAGE_KEYS.ads, next);
        return next;
      });
    },
    [persist]
  );

  const deleteFahrschulAd = useCallback(
    (id: string) => {
      setFahrschulAds((prev) => {
        const next = prev.filter((a) => a.id !== id);
        persist(STORAGE_KEYS.ads, next);
        return next;
      });
    },
    [persist]
  );

  const updateSettings = useCallback(
    (updates: Partial<SiteSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...updates };
        persist(STORAGE_KEYS.settings, next);
        return next;
      });
    },
    [persist]
  );

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.news && e.newValue) {
        setNews(JSON.parse(e.newValue) as NewsArticle[]);
      } else if (e.key === STORAGE_KEYS.seminars && e.newValue) {
        setSeminars(JSON.parse(e.newValue) as Seminar[]);
      } else if (e.key === STORAGE_KEYS.ads && e.newValue) {
        setFahrschulAds(JSON.parse(e.newValue) as FahrschulAd[]);
      } else if (e.key === STORAGE_KEYS.settings && e.newValue) {
        setSettings(JSON.parse(e.newValue) as SiteSettings);
      } else if (e.key === STORAGE_KEYS.membershipFees && e.newValue) {
        setMembershipFeesState(JSON.parse(e.newValue) as FeeRow[]);
      } else if (e.key === STORAGE_KEYS.websiteNav && e.newValue) {
        setWebsiteNavState(JSON.parse(e.newValue) as WebsiteNav);
      } else if (e.key === STORAGE_KEYS.footerContent && e.newValue) {
        setFooterContentState(JSON.parse(e.newValue) as FooterContent);
      } else if (e.key === STORAGE_KEYS.offers && e.newValue) {
        setOffersState(JSON.parse(e.newValue) as Offer[]);
      } else if (e.key === STORAGE_KEYS.lastSync && e.newValue) {
        setLastSync(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo<SiteDataContextType>(
    () => ({
      news,
      seminars,
      fahrschulAds,
      bezirksverbaende,
      settings,
      membershipFees,
      websiteNav,
      footerContent,
      offers,
      lastSync,
      addNews,
      updateNews,
      deleteNews,
      addSeminar,
      updateSeminar,
      deleteSeminar,
      addFahrschulAd,
      updateFahrschulAd,
      deleteFahrschulAd,
      updateSettings,
      setMembershipFees,
      updateFeeRow,
      addFeeRow,
      deleteFeeRow,
      setWebsiteNav,
      setFooterContent,
      setOffers,
      updateOffer,
      addOffer,
      deleteOffer,
    }),
    [
      news,
      seminars,
      fahrschulAds,
      bezirksverbaende,
      settings,
      membershipFees,
      websiteNav,
      footerContent,
      offers,
      lastSync,
      addNews,
      updateNews,
      deleteNews,
      addSeminar,
      updateSeminar,
      deleteSeminar,
      addFahrschulAd,
      updateFahrschulAd,
      deleteFahrschulAd,
      updateSettings,
      setMembershipFees,
      updateFeeRow,
      addFeeRow,
      deleteFeeRow,
      setWebsiteNav,
      setFooterContent,
      setOffers,
      updateOffer,
      addOffer,
      deleteOffer,
    ]
  );

  return (
    <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within SiteDataProvider");
  }
  return ctx;
}
