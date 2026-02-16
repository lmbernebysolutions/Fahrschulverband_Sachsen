"use client";

import { useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import type { FooterContent, NavServiceItem, NavigationItem, WebsiteNav } from "@/lib/mockData";
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
    settings,
    updateSettings,
  } = useSiteData();

  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(null);
  const [activeSection, setActiveSection] = useState<"nav" | "footer" | "mitgliedschaft">("nav");

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
          Navigation, Footer und Texte der Seite „Mitgliedschaft“ bearbeiten.
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
          onClick={() => setActiveSection("mitgliedschaft")}
          className={cn(
            "min-h-[52px] rounded-lg px-6 py-3 text-lg font-medium transition-colors",
            activeSection === "mitgliedschaft"
              ? "bg-primary-600 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          )}
        >
          Mitgliedschaft (Seite)
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

      {activeSection === "mitgliedschaft" && (
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-neutral-900">Seite „Mitgliedschaft“</h2>
          <p className="mt-1 text-neutral-600">Texte, die auf /der-verband/mitgliedschaft angezeigt werden.</p>
          <div className="mt-6 space-y-6">
            <div>
              <Label className="text-base">Intro-Text (oberer Bereich)</Label>
              <Textarea
                value={settings.mitgliedschaftIntro ?? ""}
                onChange={(e) => updateSettings({ mitgliedschaftIntro: e.target.value })}
                rows={4}
                placeholder="Intro-Text"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label className="text-base">Beitritt – Überschrift</Label>
              <Input
                value={settings.mitgliedschaftBeitrittHeadline ?? ""}
                onChange={(e) => updateSettings({ mitgliedschaftBeitrittHeadline: e.target.value })}
                placeholder="Überschrift Beitritt-Bereich"
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
            <div>
              <Label className="text-base">Beitritt – Text</Label>
              <Textarea
                value={settings.mitgliedschaftBeitrittText ?? ""}
                onChange={(e) => updateSettings({ mitgliedschaftBeitrittText: e.target.value })}
                rows={4}
                placeholder="Beitritt-Text"
                className="mt-2 text-lg"
              />
            </div>
            <div>
              <Label className="text-base">Beitritt – Button-Text</Label>
              <Input
                value={settings.mitgliedschaftBeitrittButton ?? ""}
                onChange={(e) => updateSettings({ mitgliedschaftBeitrittButton: e.target.value })}
                placeholder="Button-Text"
                className="mt-2 min-h-[52px] text-lg"
              />
            </div>
          </div>
          <div className="mt-6">
            <LargeButton
              variant="primary"
              size="xl"
              onClick={() => {
                updateSettings(settings);
                setToast({ message: "Mitgliedschaft-Texte gespeichert.", variant: "success" });
              }}
            >
              Mitgliedschaft-Texte speichern
            </LargeButton>
          </div>
        </div>
      )}
    </div>
  );
}