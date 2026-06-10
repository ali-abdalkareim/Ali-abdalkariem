import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Eye, Mail, Phone, MapPin, Moon, Sun } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { portfolioData, stats, PortfolioItem } from './data/portfolio';
import './index.css';

// Setup PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const name = "علي عبد الكريم عبد العظيم عبد الكريم";
const title = "عامل مكتبة";
const aboutText = "عامل مكتبة ذو خبرة تزيد عن 7 سنوات في تنظيم وإدارة المكتبات العامة والخاصة. متخصص في تنظيم الكتب والمستندات، تقديم خدمات عملاء ممتازة، واستخدام الحاسب الآلي بكفاءة عالية. ماهر في التصميم الجرافيكي، الطباعة، وتطوير الذات مع القدرة على العمل بروح الفريق. ملتزم بتقديم أفضل الخدمات لتعزيز تجربة المستخدمين والزوار.";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const openPDF = (pdfPath: string) => {
    setSelectedPDF(pdfPath);
    setPageNumber(1);
  };

  const closePDF = () => {
    setSelectedPDF(null);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'تنظيم الوقت', icon: 'Clock' },
    { name: 'العمل تحت الضغط', icon: 'AlertTriangle' },
    { name: 'خدمة العملاء', icon: 'Users' },
    { name: 'البيع والتعامل مع الزبائن', icon: 'ShoppingCart' },
    { name: 'إدارة المكتبات', icon: 'BookOpen' },
    { name: 'تنظيم الملفات', icon: 'Folder' },
    { name: 'استخدام الكمبيوتر', icon: 'Monitor' },
    { name: 'Microsoft Word', icon: 'FileText' },
    { name: 'Microsoft Excel', icon: 'Table' },
    { name: 'Microsoft PowerPoint', icon: 'Presentation' },
    { name: 'Canva', icon: 'Palette' },
    { name: 'Adobe Photoshop', icon: 'Image' },
    { name: 'التصوير', icon: 'Camera' },
    { name: 'الطباعة', icon: 'Printer' },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-[#0A2540] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-cairo`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0A2540]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">Portfolio</div>
          
          <div className="hidden md:flex items-center gap-8">
            {['الرئيسية', 'من أنا', 'الخبرات', 'المهارات', 'معرض الصور', 'معرض الأعمال', 'تواصل'].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item === 'الرئيسية' ? 'hero' : 
                  item === 'من أنا' ? 'about' : 
                  item === 'الخبرات' ? 'experience' :
                  item === 'المهارات' ? 'skills' :
                  item === 'معرض الصور' ? 'gallery' :
                  item === 'معرض الأعمال' ? 'portfolio' : 'contact')}
                className="hover:text-accent transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="/cv.pdf" download className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full hover:bg-blue-600 transition-all">
              <Download size={18} /> السيرة الذاتية
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-[#0A2540] border-t border-gray-200 dark:border-gray-800"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {/* Mobile links */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(0,180,216,0.15),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 bg-accent/10 dark:bg-accent/20 text-accent rounded-full text-sm font-medium">
              +7 سنوات خبرة
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight tracking-tighter">
              {name}
            </h1>
            
            <p className="text-3xl text-gray-600 dark:text-gray-400">{title}</p>
            
            <p className="text-xl max-w-md text-gray-600 dark:text-gray-300">
              {aboutText.substring(0, 180)}...
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-4 bg-accent hover:bg-blue-600 text-white rounded-2xl font-medium flex items-center gap-3 transition-all shadow-lg shadow-accent/30"
              >
                <Eye size={20} /> مشاهدة الأعمال
              </motion.button>
              
              <a 
                href="/cv.pdf" 
                download 
                className="px-8 py-4 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl font-medium flex items-center gap-3 transition-all"
              >
                <Download size={20} /> تحميل السيرة الذاتية
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square w-full max-w-md mx-auto rounded-[3rem] overflow-hidden border-8 border-white dark:border-gray-900 shadow-2xl">
              <img 
                src="/images/dn.jpg" 
                alt="علي عبد الكريم" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A2540]/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-accent mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">من أنا</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded"></div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-center md:text-right">
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">الخبرات</h2>
          </div>
          <div className="space-y-12">
            <div className="glass p-8 rounded-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold">عامل مكتبة</h3>
                  <p className="text-accent mt-1">مكتبة عامة / خاصة</p>
                </div>
                <div className="text-sm text-gray-500">2018 - الحاضر</div>
              </div>
              <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400 list-disc list-inside">
                <li>تنظيم وتصنيف أكثر من 5000 كتاب ومستند.</li>
                <li>تقديم خدمات دعم لأكثر من 200 عميل يوميًا.</li>
                <li>إدارة نظام الحجز والإعارة باستخدام برامج متخصصة.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">المهارات</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass p-6 rounded-3xl flex flex-col items-center text-center hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  {/* Lucide icons would need dynamic import but for simplicity use placeholder */}
                  <div className="text-3xl text-accent">★</div>
                </div>
                <h4 className="font-semibold text-lg">{skill.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section id="gallery" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">معرض الصور</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">تصاميم متنوعة وإبداعية</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['/images/dn.jpg', '/images/dn2.jpg', '/images/dnwater.jpg'].map((img, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img} 
                  alt={`تصميم ${index + 1}`}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                  <p className="text-white">اضغط للتكبير</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">معرض الأعمال</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">أبرز مشاريعي التصميمية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group glass rounded-3xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all"
              >
                <div className="relative h-64">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full">PDF</div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3">{item.description}</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => openPDF(item.pdf!)}
                      className="flex-1 py-3.5 bg-accent hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 transition-all"
                    >
                      <Eye size={18} /> عرض
                    </button>
                    <a 
                      href={item.pdf} 
                      download 
                      className="flex-1 py-3.5 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl flex items-center justify-center gap-2 transition-all"
                    >
                      <Download size={18} /> تحميل
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">تواصل معي</h2>
          <p className="text-xl mb-12 max-w-md mx-auto">أنا متوفر للتواصل والتعاون في أي مشروع جديد</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <a href="mailto:your.email@example.com" className="glass p-8 rounded-3xl hover:scale-105 transition-transform flex flex-col items-center gap-4 group">
              <Mail className="w-12 h-12 text-accent" />
              <div>
                <div className="font-medium">البريد الإلكتروني</div>
                <div className="text-sm text-gray-500">your.email@example.com</div>
              </div>
            </a>
            
            <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4">
              <Phone className="w-12 h-12 text-accent" />
              <div>
                <div className="font-medium">رقم الهاتف</div>
                <div className="text-sm text-gray-500">+966 XX XXX XXXX</div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl flex flex-col items-center gap-4">
              <MapPin className="w-12 h-12 text-accent" />
              <div>
                <div className="font-medium">الموقع</div>
                <div className="text-sm text-gray-500">المملكة العربية السعودية</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2026 {name}. جميع الحقوق محفوظة.</p>
          <p className="text-sm mt-2 text-gray-400">مصمم بـ React + Tailwind + Framer Motion</p>
        </div>
      </footer>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPDF && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={closePDF}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-950">
                <h3 className="font-semibold">عرض الملف</h3>
                <button onClick={closePDF} className="text-gray-500 hover:text-black dark:hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                <Document 
                  file={selectedPDF} 
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="mx-auto"
                >
                  <Page pageNumber={pageNumber} width={800} />
                </Document>
              </div>
              
              {numPages > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-white/90 dark:bg-black/90 px-6 py-3 rounded-full">
                  <button 
                    onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber === 1}
                    className="px-4 py-1 disabled:opacity-50"
                  >
                    السابق
                  </button>
                  <span>{pageNumber} / {numPages}</span>
                  <button 
                    onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                    disabled={pageNumber === numPages}
                    className="px-4 py-1 disabled:opacity-50"
                  >
                    التالي
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedImage(null)}>
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={selectedImage} 
              alt="Lightbox" 
              className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
