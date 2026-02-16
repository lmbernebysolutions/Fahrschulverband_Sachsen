"use client";

import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { FooterContent, NavServiceItem, NavigationItem, Offer, WebsiteNav } from "@/lib/mockData";
import { AdminBreadcrumbs, LargeButton } from "@/components/admin";
import { Button, Input, Label, Textarea } from "@/components/atoms";
import { Toast } from "@/components/molecules";
import { cn } from "@/lib/utils";

export default function WebsiteTextePage() {
  const {
    websiteNav,
    setWebsiteNav,
    footerContent,
    setFooterContent,
    offers,
    setOffers,
    updateOffer,
    addOffer,
    deleteOffer,
  } = useSiteData();

  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const [activeSection, setActiveSection] = useState<"nav" | "footer" | "angebote">("nav");

  const saveNav = () => {
    setWebsiteNav(websiteNav);
    setToast({ message: "Navigation gespeichert.", variant: "success" });
  };

  const saveFooter = () => {
    setFooterContent(footerContent);
    setToast({ message: "Footer gespeichert.", variant: "success" });
  };

  const updateServiceItem = (id: string, field: keyof NavServiceItem, value: string | number) => {
    setWebsiteNav({
      ...websiteNav,
      service: websiteNav.service.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const updateMainItem = (id: string, field: keyof NavigationItem, value: string | number | NavigationItem[] | undefined) => {
    const update = (items: NavigationItem[]): NavigationItem[] =>
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item.children ? { ...item, children: update(item.children) } : item
      );
    setWebsiteNav({ ...websiteNav, main: update(websiteNav.main) });
  };

  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs items={["Übersicht", "Inhalte bearbeiten", "Website-Texte"]} />
        <h1 className="mt-4 text-3xl font-bold text-neutral-900">
          Website-Texte
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Navigation, Footer und Angebote des Landesverbandes bearbeiten.
        </p>
      </div>

      {toast && (
        <Toast variant={toast.variant} message={toast.message} onDismiss={() => setToast(null)} />
      )}

      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveSection("nav")}
          className={cn(
            "min-h-[52px] rounded-lg px-6 py-3 text-lg font-medium transition-colors",
            activeSection === "nav"
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          Navigation
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("footer")}
          className={cn(
            "min-h-[52px] rounded-lg px-6 py-3 text-lg font-medium transition-colors",
            activeSection === "footer"
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          Footer
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("angebote")}
          className={cn(
            "min-h-[52px] rounded-lg px-6 py-3 text-lg font-medium transition-colors",
            activeSection === "angebote"
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          Angebote
        </button>
      </div>

      {activeSection === "nav" && (
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900">Service-Leiste (oben rechts)</h2>
          <p className="mt-1 text-neutral-600">Links: Kontakt, Mitgliederbereich, Impressum, Datenschutz</p>
          <div className="mt-6 space-y-4">
            {websiteNav.service.map((item) => (
              <div key={item.id} className="flex flex-wrap gap-4 rounded-lg border border-neutral-200 p-4">
                <div className="min-w-[200px] flex-1">
                  <Label className="text-base">Label</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => updateServiceItem(item.id, "label", e.target.value)}
                    className="mt-1 min-h-[52px] text-lg"
                  />
                </div>
                <div className="min-w-[200px] flex-1">
                  <Label className="text-base">Link-Adresse</Label>
                  <Input
                    value={item.href}
                    onChange={(e) => updateServiceItem(item.id, "href", e.target.value)}
                    className="mt-1 min-h-[52px] text-lg"
                  />
                </div>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-xl font-bold text-neutral-900">Hauptnavigation</h2>
          <p className="mt-1 text-neutral-600">Menüpunkte mit optionalen Unterpunkten</p>
          <div className="mt-6 space-y-8">
            {websiteNav.main.map((item) => (
              <div key={item.id} className="rounded-lg border border-neutral-200 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-base">Menüpunkt (Anzeigename)</Label>
                    <Input
                      value={item.label}
                      onChange={(e) => updateMainItem(item.id, "label", e.target.value)}
                      className="mt-1 min-h-[52px] text-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-base">Link-Adresse</Label>
                    <Input
                      value={item.href}
                      onChange={(e) => updateMainItem(item.id, "href", e.target.value)}
                      className="mt-1 min-h-[52px] text-lg"
                    />
                  </div>
                </div>
                {item.children && item.children.length > 0 && (
                  <div className="mt-6 border-t border-neutral-200 pt-6">
                    <Label className="text-base">Unterpunkte</Label>
                    <div className="mt-3 space-y-3">
                      {item.children.map((child) => (
                        <div key={child.id} className="flex flex-wrap gap-4">
                          <Input
                            value={child.label}
                            onChange={(e) => {
                              const newChildren = item.children!.map((c) =>
                                c.id === child.id ? { ...c, label: e.target.value } : c
                              );
                              updateMainItem(item.id, "children", newChildren);
                            }}
                            className="min-h-[48px] flex-1 text-base"
                            placeholder="Label"
                          />
                          <Input
                            value={child.href}
                            onChange={(e) => {
                              const newChildren = item.children!.map((c) =>
                                c.id === child.id ? { ...c, href: e.target.value } : c
                              );
                              updateMainItem(item.id, "children", newChildren);
                            }}
                            className="min-h-[48px] flex-1 text-base"
                            placeholder="Link"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <LargeButton variant="primary" size="xl" onClick={saveNav}>
              Navigation speichern
            </LargeButton>
          </div>
        </div>
      )}

      {activeSection === "footer" && (
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900">Footer – Kontakt</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-lg">Name</Label>
              <Input
                value={footerContent.contact.name}
                onChange={(e) =>
                  setFooterContent({
                    contact: { ...footerContent.contact, name: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Adresse</Label>
              <Input
                value={footerContent.contact.address}
                onChange={(e) =>
                  setFooterContent({
                    contact: { ...footerContent.contact, address: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Telefon</Label>
              <Input
                value={footerContent.contact.phone}
                onChange={(e) =>
                  setFooterContent({
                    contact: { ...footerContent.contact, phone: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Fax</Label>
              <Input
                value={footerContent.contact.fax}
                onChange={(e) =>
                  setFooterContent({
                    contact: { ...footerContent.contact, fax: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-lg">E-Mail</Label>
              <Input
                type="email"
                value={footerContent.contact.email}
                onChange={(e) =>
                  setFooterContent({
                    contact: { ...footerContent.contact, email: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
          </div>
          <h2 className="mt-10 text-xl font-bold text-neutral-900">Mitglieder-Bereich (über dem Footer)</h2>
          <div className="mt-6 space-y-4">
            <div>
              <Label className="text-lg">Überschrift</Label>
              <Input
                value={footerContent.membershipCta.headline}
                onChange={(e) =>
                  setFooterContent({
                    membershipCta: { ...footerContent.membershipCta, headline: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Text</Label>
              <Textarea
                value={footerContent.membershipCta.text}
                onChange={(e) =>
                  setFooterContent({
                    membershipCta: { ...footerContent.membershipCta, text: e.target.value },
                  })
                }
                rows={3}
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label className="text-lg">Button-Text</Label>
              <Input
                value={footerContent.membershipCta.buttonText}
                onChange={(e) =>
                  setFooterContent({
                    membershipCta: { ...footerContent.membershipCta, buttonText: e.target.value },
                  })
                }
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
          </div>
          <div className="mt-6">
            <Label className="text-lg">Copyright-Zeile</Label>
            <Input
              value={footerContent.copyright}
              onChange={(e) => setFooterContent({ copyright: e.target.value })}
              className="mt-2 min-h-[52px] text-lg"
            />
          </div>
          <div className="mt-8">
            <LargeButton variant="primary" size="xl" onClick={saveFooter}>
              Footer speichern
            </LargeButton>
          </div>
        </div>
      )}

      {activeSection === "angebote" && (
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900">Angebote des Landesverbandes</h2>
          <p className="mt-1 text-neutral-600">Rahmenverträge, Fahrlehrer-Info, Fahrschulsuche usw.</p>
          <div className="mt-6 space-y-8">
            {[...offers].sort((a, b) => a.order - b.order).map((offer) => (
              <div key={offer.id} className="rounded-lg border border-neutral-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <Label className="text-lg">Titel</Label>
                      <Input
                        value={offer.title}
                        onChange={(e) => updateOffer(offer.id, { title: e.target.value })}
                        className="mt-2 min-h-[52px] text-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-lg">Text</Label>
                      <Textarea
                        value={offer.text}
                        onChange={(e) => updateOffer(offer.id, { text: e.target.value })}
                        rows={5}
                        className="mt-2 text-lg"
                      />
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (confirm("Angebot wirklich entfernen?")) deleteOffer(offer.id);
                    }}
                  >
                    Entfernen
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <LargeButton variant="secondary" size="xl" onClick={addOffer}>
              + Neues Angebot
            </LargeButton>
            <LargeButton
              variant="primary"
              size="xl"
              onClick={() => {
                setOffers(offers);
                setToast({ message: "Angebote gespeichert.", variant: "success" });
              }}
            >
              Angebote speichern
            </LargeButton>
          </div>
        </div>
      )}
    </div>
  );
}