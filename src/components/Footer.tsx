import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useT, useLocalized } from "@/lib/i18n";
import { useContentStore } from "@/stores/contentStore";
import bahrain2030 from "@/assets/bahrain-2030.png";
import igaLogo from "@/assets/iga-logo.png";

export default function Footer() {
  const t = useT();
  const L = useLocalized();
  const { footer } = useContentStore();

  return (
    <footer id="footer" className="govbh-footer theme--dark pb-0">
      <div className="container mx-auto px-4">
        <div className="row flex flex-wrap -mx-4">
          
          {/* Contact Column */}
          <div className="col-xl-3 col-lg-3 col-md-6 w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="govbh-footer__head govbh-fs-h5 mb-6">{t("footer.contact")}</div>
            <address className="govbh-footer__body not-italic">
              <dl className="space-y-4">
                <div className="flex gap-3">
                  <dt className="shrink-0 mt-1"><MapPin size={18} className="text-accent" /></dt>
                  <dd className="govbh-footer__paragraph text-sm opacity-80 leading-relaxed">
                    {L(footer.address, footer.address_ar)}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0"><Phone size={18} className="text-accent" /></dt>
                  <dd><a href={`tel:${footer.phone}`} className="govbh-footer__tel text-sm hover:text-accent transition-colors">{footer.phone}</a></dd>
                </div>
                <div className="flex gap-3">
                  <dt className="shrink-0"><Mail size={18} className="text-accent" /></dt>
                  <dd><a href="mailto:info@iga.gov.bh" className="govbh-footer__tel text-sm hover:text-accent transition-colors">info@iga.gov.bh</a></dd>
                </div>
              </dl>
            </address>
          </div>

          {/* Quick Links Column */}
          <div className="col-xl-3 col-lg-3 col-md-6 w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="govbh-footer__head govbh-fs-h5 mb-6">{t("footer.quickLinks")}</div>
            <div className="govbh-footer__body">
              <ul className="govbh-footer__link space-y-3">
                {footer.quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-sm opacity-80 hover:text-accent hover:opacity-100 transition-all">
                      {L(link.label, link.label_ar)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Links Column */}
          <div className="col-xl-3 col-lg-3 col-md-6 w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="govbh-footer__head govbh-fs-h5 mb-6">{t("footer.relatedMinistries")}</div>
            <div className="govbh-footer__body">
              <ul className="govbh-footer__link space-y-3">
                {footer.externalLinks?.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-sm opacity-80 hover:text-accent hover:opacity-100 transition-all">
                      {L(link.label, link.label_ar)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subscribe & Social Column */}
          <div className="col-xl-3 col-lg-3 col-md-6 w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="govbh-footer__head govbh-fs-h5 mb-6">{t("footer.subscribe")}</div>
            <div className="govbh-footer__body mb-8">
              <form className="govbh-footer__newsletter flex">
                <div className="govbh-footer__newsletter-input relative flex-1">
                  <input 
                    type="email" 
                    placeholder={t("footer.emailPlaceholder")}
                    className="w-full bg-white/10 border border-white/20 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                  <button className="bg-accent px-4 py-2 rounded-r-md hover:bg-accent/90 transition-colors">
                    <Globe size={18} />
                  </button>
                </div>
              </form>
            </div>
            
            <div className="govbh-footer__solcial-widget">
              <div className="govbh-fs-h5 mb-4">{t("footer.followUs")}</div>
              <ul className="flex gap-4">
                {footer.socialLinks?.map((link, idx) => {
                  const Icon = link.platform === "Facebook" ? Facebook : 
                               link.platform === "Twitter" ? Twitter :
                               link.platform === "Instagram" ? Instagram :
                               link.platform === "LinkedIn" ? Linkedin : Youtube;
                  return (
                    <li key={idx}>
                      <a href={link.href} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                        <Icon size={20} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full px-4">
            <div className="h-[1px] bg-white/10 my-8"></div>
          </div>

          {/* Footer Logos Section */}
          <div className="w-full px-4 mb-12">
            <div className="govbh-footer__logos flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="govbh-footer__logos-col">
                <img src={igaLogo} alt="IGA Logo" className="h-12 w-auto brightness-0 invert opacity-90" />
              </div>
              <div className="govbh-footer__logos-col-services flex items-center gap-8">
                 <a href="https://www.bahrain.bh" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                    <span className="text-xl font-bold tracking-tighter">bahrain.bh</span>
                 </a>
                 <a href="#" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                    <img src={bahrain2030} alt="Bahrain 2030" className="h-14 w-auto grayscale brightness-200" />
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Menu & Copyright */}
      <div className="govbh-footer__menu bg-black/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="govbh-footer__menu-col flex flex-col md:flex-row items-center gap-6">
              <div className="govbh-footer__lastupdate text-xs opacity-60 flex items-center gap-2">
                <Globe size={14} />
                {t("footer.lastUpdated")}: 29 May 2025
              </div>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {footer.legalLinks?.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-xs opacity-70 hover:opacity-100 hover:text-accent transition-all">
                      {L(link.label, link.label_ar)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="govbh-footer__copyrights text-xs opacity-60">
              <p>© {new Date().getFullYear()} {L(footer.copyright, footer.copyright_ar)}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
