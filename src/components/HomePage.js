"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState("uk");
  const [showMoreDelhi, setShowMoreDelhi] = React.useState(false);

  // India states and cities (extend as needed)
  const states = React.useMemo(() => ([
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ]), []);

  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  // Form fields for mailer
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          state: selectedState,
          city: selectedCity,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to submit");
      }
      setMessage("Submitted. We will contact you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setSelectedState("");
      setSelectedCity("");
    } catch (err) {
      console.error(err);
      setMessage("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }


  const universities = {
    uk: [
      {
        name: "King's College London",
        city: "London, United Kingdom",
        logo: "https://www.kcl.ac.uk/SiteElements/2017/images/kcl-logo.svg",
        courses: "497+ Courses",
      },
      {
        name: "University of Manchester",
        city: "Manchester, United Kingdom",
        logo: "https://assets.manchester.ac.uk/corporate/images/design/logo-university-of-manchester.png",
        courses: "519+ Courses",
      },
      {
        name: "University of Birmingham",
        city: "Birmingham, United Kingdom",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Shield_of_the_University_of_Birmingham.svg/330px-Shield_of_the_University_of_Birmingham.svg.png",
        courses: "450+ Courses",
      },
      {
        name: "University of Bristol",
        city: "Bristol, United Kingdom",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxu9iHxygYxBlKKC_zHGgfH0uTQSZ6z7f2A&s",
        courses: "503+ Courses",
      },
      {
        name: "University of Leeds",
        city: "Leeds, United Kingdom",
        logo: "https://www.leeds.ac.uk/site/custom_scripts/campus_map/imgs/icons/loading.png",
        courses: "335+ Courses",
      },
      {
        name: "University of Liverpool",
        city: "Liverpool, United Kingdom",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Arms_of_the_University_of_Liverpool.svg",
        courses: "373+ Courses",
      },
    ],
    ireland: [
      {
        name: "Trinity College Dublin",
        city: "Dublin, Ireland",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlUM-ELaf5mcow9N9FViwZ0CaZ3lvI2x5xLg&s",
        courses: "497+ Courses",
      },
      {
        name: "University College Cork",
        city: "Cork, Ireland",
        logo: "https://www.ucc.ie/en/media/2017siteassets/images/ucc-central-header-logo.svg",
        courses: "357+ Courses",
      },
      {
        name: "University College Dublin",
        city: "Dublin, Ireland",
        logo: "https://www.ucd.ie/t4media/crest-ucd.svg",
        courses: "251+ Courses",
      },
      {
        name: "University of Galway",
        city: "Galway, Ireland",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVomanQ5XuKjbigBzsX-BKZ-qhIV3mY61pcQ&s",
        courses: "387+ Courses",
      },
      {
        name: "Dublin City University",
        city: "Dublin, Ireland",
        logo: "https://www.dcu.ie/sites/default/files/scholarship_editor/2022-11/DCU_Digital_Logo_Official_Navy_Stacked.png",
        courses: "489+ Courses",
      },
      {
        name: "University of Limerick",
        city: "Limerick, Ireland",
        logo: "https://telme.hypotheses.org/files/2025/03/University-of-Limerick-logo-371x500.png",
        courses: "286+ Courses",
      },
    ],
    australia: [
      {
        name: "Australian National University",
        city: "Canberra, Australia",
        logo: "https://d1zkbwgd2iyy9p.cloudfront.net/themes/custom/webstyle/favicon.ico",
        courses: "497+ Courses",
      },
      {
        name: "The University of Melbourne",
        city: "Melbourne, Australia",
        logo: "https://designsystem.web.unimelb.edu.au/static/img/logo-icon.svg",
        courses: "297+ Courses",
      },
      {
        name: "University of Sydney",
        city: "Sydney, Australia",
        logo: "https://www.sydney.edu.au/etc.clientlibs/corporate-commons/clientlibs/foundation/resources/corporate-frontend/assets/img/favicon/favicon-96x96.png",
        courses: "264+ Courses",
      },
      {
        name: "University of New South Wales",
        city: "Sydney, Australia",
        logo: "https://www.unsw.edu.au/etc.clientlibs/unsw-common/clientlibs/clientlib-unsw-web-resources/resources/icon-192x192.png",
        courses: "335+ Courses",
      },
      {
        name: "University of Queensland",
        city: "Brisbane, Australia",
        logo: "https://universitiesaustralia.edu.au/wp-content/uploads/2019/05/UQ-300x300.png",
        courses: "297+ Courses",
      },
      {
        name: "Monash University",
        city: "Melbourne, Australia",
        logo: "https://www.monash.edu/__data/assets/git_bridge/0006/509343/deploy/mysource_files/favicon-152.png",
        courses: "258+ Courses",
      },
    ],
    canada: [
      {
        name: "University of British Columbia",
        city: "Vancouver, Canada",
        logo: "https://images.seeklogo.com/logo-png/35/1/university-of-british-columbia-logo-png_seeklogo-350128.png",
        courses: "187+ Courses",
      },
      {
        name: "University of Alberta",
        city: "Edmonton, Canada",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4mhwS_Xb1bJdOpH7pw55NiajRSBYA4e9hA&s",
        courses: "297+ Courses",
      },
      {
        name: "University of Waterloo",
        city: "Waterloo, Canada",
        logo: "https://yt3.googleusercontent.com/ytc/AIdro_nzwRkt4e16fNeYgT9nhQ40TUSzTVNQdEp11aVGTeTb3A=s900-c-k-c0x00ffffff-no-rj",
        courses: "245+ Courses",
      },
      {
        name: "University of Calgary",
        city: "Calgary, Canada",
        logo: "https://yt3.googleusercontent.com/IbSIs7lLMmpZzoUEYoCHPl4XPbkzYW2AnfeW5cCRAe3_OH5ahiwW2xA5qE2hXT5TRlxaprnb=s900-c-k-c0x00ffffff-no-rj",
        courses: "325+ Courses",
      },
      {
        name: "University of Ottawa",
        city: "Ottawa, Canada",
        logo: "https://images.seeklogo.com/logo-png/35/2/university-of-ottawa-logo-png_seeklogo-356159.png",
        courses: "190+ Courses",
      },
      {
        name: "Dalhousie University",
        city: "Halifax, Canada",
        logo: "https://ih1.redbubble.net/image.5065040990.0217/raf,360x360,075,t,fafafa:ca443f4786.jpg",
        courses: "337+ Courses",
      },

    ],
    dubai: [
      {
        name: "American University of Ras Al Khaimah",
        city: "Ras Al Khaimah, UAE",
        logo: "https://www.lodplanner.com/wp-content/uploads/american-university-of-ras-al-khaimah-aurak-logo-uae.jpg",
        courses: "320+ Courses",
      },
      {
        name: "Curtin University Dubai",
        city: "Dubai, UAE",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkxeWWDLk86EWJjMBfTV_JMXDC541aRy8e7w&s",
        courses: "357+ Courses",
      },
      {
        name: "University of Wollongong in Dubai",
        city: "Dubai, UAE",
        logo: "https://i.imgur.com/bIsabqw.png",
        courses: "298+ Courses",
      },
      {
        name: "University Of Bolton",
        city: "Ras Al Khaimah U.A.E",
        logo: "https://www.bolton.ac.ae/wp-content/uploads/2024/06/cropped-fav-180x180.png",
        courses: "339+ Courses",
      },
      {
        name: "Murdoch University Dubai",
        city: "Dubai, UAE",
        logo: "https://www.murdochuniversitydubai.com/wp-content/themes/wp-murdoch-dubai/images/favicon.png",
        courses: "225+ Courses",
      },
      {
        name: "University of Birmingham",
        city: "Dubai, United Arab Emirates",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Shield_of_the_University_of_Birmingham.svg",
        courses: "445+ Courses",
      },
    ],
  };

  return (
    <div className="relative min-h-screen">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-0 bg-[#fffffff8] bg-opacity-90 shadow-md z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div >
            <img src="https://sopedits.com/wp-content/uploads/2024/04/091.png" alt="SOP-Edits Overseas Logo" className="h-14 w-auto mr-2" />
          </div>
          <div className="flex items-center gap-3">
            {/* Call icon button */}
            <a
              href="tel:8290806541"
              aria-label="Call us"
              className="flex items-center justify-center w-10 h-10 text-gray-700 hover:bg-blue-50 transition"
              title="Call us"
            >
              <img src="https://gonardweb.com/wp-content/uploads/2023/09/call.png" alt="" srcSet="https://gonardweb.com/wp-content/uploads/2023/09/call.png" width="60" height="60" />
            </a>
            {/* WhatsApp icon button */}
            <a
              href="https://wa.me/918290806541"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full text-green-600 hover:bg-green-50 transition"
              title="Chat on WhatsApp"
            >
              <img src="https://gonardweb.com/wp-content/uploads/2023/09/whatsapp.png" alt="WhatsApp" srcSet="https://gonardweb.com/wp-content/uploads/2023/09/whatsapp.png" width="60" height="60" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-[80vh] overflow-hidden py-20 mt-18">
        {/* Background Image (full width) */}
        <img src="https://publicassets.leverageedu.com/abroadConsultantDelhiHero.png" alt="Delhi Hero" className="absolute inset-0 w-full h-full object-cover z-0" style={{ objectPosition: 'center' }} />
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10" /> */}
        <div className="container mx-auto relative z-20 px-4 flex flex-col md:flex-row items-center justify-center px-8 py-20 min-h-[80vh]">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-start md:items-start">
            <div className="py-12 md:py-0">
              <h1 className="text-white text-2xl md:text-5xl font-extrabold mb-6 drop-shadow-lg text-center md:text-left">SOP-Edits Overseas - Your Study Abroad Consultant</h1>
              <ul className="text-white text-lg space-y-2 drop-shadow-lg">
                <li className="flex items-center"><span className="mr-2">✔️</span>Courses starting from ₹8 Lakhs*</li>
                <li className="flex items-center"><span className="mr-2">✔️</span>Scholarship worth ₹10,00,000*</li>
                <li className="flex items-center"><span className="mr-2">✔️</span>Offer letter in less than 48 hours*</li>
              </ul>
            </div>
          </div>
          {/* Right: Form */}
          <div className="flex-1 max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 mt-8 md:mt-0 md:ml-8 bg-opacity-95 z-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center leading-tight">Start your Study Abroad <br />Journey</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative">
                <input type="text" placeholder="Enter Full Name*" className="w-full border border-gray-300 rounded-xl px-2 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer" required value={name} onChange={(e) => setName(e.target.value)} />
                <label className="absolute left-4 top-[-8px] bg-white px-1 text-xs text-gray-500 pointer-events-none peer-focus:text-blue-500">Name*</label>
              </div>
              <div className="relative">
                <input type="email" placeholder="Enter Email Address*" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="absolute left-4 top-[-8px] bg-white px-1 text-xs text-gray-500 pointer-events-none peer-focus:text-blue-500">Enter Email Address*</label>
              </div>
              <div className="relative">
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={(val) => setPhone(val)}
                  inputProps={{ name: "phone", required: true }}
                  placeholder="Mobile number"
                  enableSearch
                  countryCodeEditable={false}
                  inputClass="w-full !text-md !border !border-gray-300 !rounded-r-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
                  containerClass="w-full"
                  buttonClass="!rounded-l-xl !border !border-gray-300"
                  inputStyle={{ height: '48px', padding: '0 45px', width: '100%' }}
                  buttonStyle={{ height: '48px' }}
                />
                <label className="absolute left-4 top-[-8px] bg-white px-1 text-xs text-gray-500 pointer-events-none">Mobile number*</label>
              </div>

              {/* State */}
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("");
                  }}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <label className="absolute left-4 top-[-8px] bg-white px-1 text-xs text-gray-500 pointer-events-none">Current State</label>
              </div>

              {/* City (depends on State) */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={selectedState ? "Enter City*" : "Select State first"}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                  required
                />
                <label className="absolute left-4 top-[-8px] bg-white px-1 text-xs text-gray-500 pointer-events-none peer-focus:text-blue-500">City*</label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" className="mr-2 h-4 w-4" defaultChecked />
                <span className="text-gray-600 text-base">I have read and agreed to <a href="#" className="text-blue-600 underline">terms</a> & <a href="#" className="text-blue-600 underline">privacy policy</a></span>
              </div>
              <button type="submit" className="w-full bg-blue-400 text-white font-bold py-2 rounded-xl mt-2 text-lg hover:bg-blue-500 transition" disabled={submitting}>{submitting ? "Submitting..." : "Book your free consultation"}</button>
              {message && <div className="text-center text-sm mt-2">{message}</div>}
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose SOP-Edits Section */}
      <section className="bg-[#fff] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold  text-center mb-12">
            Why Choose <span className="text-blue-500">SOP-Edits Overseas?</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-6xl mb-4 inline-block"><img src="https://www.svgrepo.com/show/428734/university-academy-school.svg" alt="Partner Universities" width="60" height="60" /></span>
              <div className="text-sm sm:text-base md:text-xl font-bold text-gray-900 mb-2">1000+ <span className="font-normal">Partner Universities</span></div>
            </div>
            <div>
              <span className="text-6xl mb-4 inline-block"><img src="https://www.svgrepo.com/show/324120/graduation-education-cap-mortarboard-graduate.svg" alt="Partner Universities" width="60" height="60" /></span>
              <div className="text-sm sm:text-base md:text-xl font-bold text-gray-900 mb-2">Course Starting <span className="font-normal">₹8 Lakhs*</span></div>
            </div>
            <div>
              <span className="text-6xl mb-4 inline-block"><img src="https://www.svgrepo.com/show/245796/geography-map.svg" alt="Partner Universities" width="60" height="60" /></span>
              <div className="text-sm sm:text-base md:text-xl font-bold text-gray-900 mb-2">80+ <span className="font-normal">Countries</span></div>
            </div>
            <div>
              <span className="text-6xl mb-4 inline-block"><img src="https://www.svgrepo.com/show/422999/trophy-prize-achievement.svg" alt="Partner Universities" width="60" height="60" /></span>
              <div className="text-sm sm:text-base md:text-xl font-bold text-gray-900 mb-2">90000+ <span className="font-normal">Success Stories</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* Third Section: Top Universities */}
      <section className="bg-[#f6fbff] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold  text-center mb-8">
            Top Universities to <span className="text-blue-500">Study Abroad</span>
          </h2>
          {/* Country Tabs */}
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            <button onClick={() => setActiveTab("uk")} className={`flex items-center gap-2 font-semibold pb-1 border-b-2 ${activeTab === "uk" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-blue-600"}`}>
              <span role="img" aria-label="UK"><img src="https://publicassets.leverageedu.com/study-abroad/ukFlag.png" alt="United Kingdom" srcSet="https://publicassets.leverageedu.com/study-abroad/ukFlag.png" width="24" height="24" className="rounded-xl" /></span> United Kingdom
            </button>
            <button onClick={() => setActiveTab("ireland")} className={`flex items-center gap-2 font-semibold pb-1 border-b-2 ${activeTab === "ireland" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-blue-600"}`}>
              <span role="img" aria-label="Ireland"><img src="https://publicassets.leverageedu.com/study-abroad/irelandFlag.png" alt="Ireland" srcSet="https://publicassets.leverageedu.com/study-abroad/irelandFlag.png" width="24" height="24" className="rounded-xl" /></span> Ireland
            </button>
            <button onClick={() => setActiveTab("australia")} className={`flex items-center gap-2 font-semibold pb-1 border-b-2 ${activeTab === "australia" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-blue-600"}`}>
              <span role="img" aria-label="Australia"><img src="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2025-06/australia-flag-round-icon-256.png?itok=LoUO1LkV" alt="Australia" srcSet="https://judiciariesworldwide.fjc.gov/sites/default/files/styles/max_325x325/public/2025-06/australia-flag-round-icon-256.png?itok=LoUO1LkV" width="24" height="24" className="rounded-xl" /></span> Australia
            </button>
            <button onClick={() => setActiveTab("canada")} className={`flex items-center gap-2 font-semibold pb-1 border-b-2 ${activeTab === "canada" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-blue-600"}`}>
              <span role="img" aria-label="Canada"><img src="https://publicassets.leverageedu.com/study-abroad/canadaFlag.png" alt="Canada" srcSet="https://publicassets.leverageedu.com/study-abroad/canadaFlag.png" width="24" height="24" className="rounded-xl" /></span> Canada
            </button>
            <button onClick={() => setActiveTab("dubai")} className={`flex items-center gap-2 font-semibold pb-1 border-b-2 ${activeTab === "dubai" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent hover:text-blue-600"}`}>
              <span role="img" aria-label="Dubai"><img src="https://publicassets.leverageedu.com/study-abroad/dubaiFlag.png" alt="Dubai" srcSet="https://publicassets.leverageedu.com/study-abroad/dubaiFlag.png" width="24" height="24" className="rounded-xl" /></span> Dubai
            </button>
          </div>
          {/* Universities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {universities[activeTab].length === 0 ? (
              <div className="col-span-full text-center text-gray-400 text-lg py-12">No universities available for this country yet.</div>
            ) : (
              universities[activeTab].map((uni, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                  <img src={uni.logo} alt={uni.name} className="h-16 w-16 object-contain rounded" />
                  <div>
                    <div className="font-bold text-sm sm:text-base md:text-md text-gray-900">{uni.name}</div>
                    <div className="text-gray-500 text-sm">{uni.city}</div>
                  </div>
                  <span className="ml-auto mt-12 text-nowrap bg-yellow-200 text-yellow-800 text-[10px] font-semibold px-3 py-1 rounded">{uni.courses}</span>
                </div>
              )))
            }
          </div>
        </div>
      </section>
      {/* Fourth Section: Success Stories */}
      <section className="bg-[#fff] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-2">
            50,000+ <span className="text-blue-500">Success Stories</span>
          </h2>
          {/* <div className="text-gray-500 text-lg mb-10">From Dreamers to Achievers</div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Kshitij" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Bharathkumar Patil</div>
                  <div className="text-gray-500 text-sm">Delhi ⟶ United States</div>
                </div>
              </div>
              <div className="text-gray-700 mb-2">Provided Outstanding support till the Visa arrived They offered personalized advice and strategic planning that greatly enhanced my educational path. Professional, knowledgeable, and truly supportive. Thank you rithika ma'am amaneesh ma'am and team. This educational consultancy is highly recommended!"</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Data Science</span>
                <img src="https://www.kcl.ac.uk/SiteElements/2017/images/kcl-logo.svg" alt="University of Birmingham" className="h-6 w-auto ml-auto" />
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Samad" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Devarsh Wali</div>
                  <div className="text-gray-500 text-sm">Gujarat ⟶ United States</div>
                </div>
              </div>
              <div className="text-gray-700 mb-2">I had an amazing experience with them. The counsellor assigned for me Nitasha mam. She was really helpful throughout the process and one of their best counsellors. A big thanks to Amaneesh mam who kept motivating me throughout this journey and gave tips and ways to get into the college I wanted to go in.</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Data Science</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Arms_of_the_University_of_Liverpool.svg" alt="Queen Mary University of London" className="h-6 w-auto ml-auto" />
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://randomuser.me/api/portraits/men/34.jpg" alt="Shubham" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Kuldeep Sihag</div>
                  <div className="text-gray-500 text-sm">Telangana ⟶ United States</div>
                </div>
              </div>
              <div className="text-gray-700 mb-2">SOP-Edits overseas is such a great team, i cannot begin to describe. I received my spouse visa for uk through them. They helped in the full process and I received the visa through them in less than month. I was so surprised and not only that, the process with them was so smooth and hassle free.</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Sciences</span>
                <img src="https://assets.manchester.ac.uk/corporate/images/design/logo-university-of-manchester.png" alt="University of Illinois" className="h-6 w-auto ml-auto" />
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="Naveenkumar" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Digvijaysingh Rajput</div>
                  <div className="text-gray-500 text-sm">Karnataka ⟶ United States</div>
                </div>
              </div>
              <div className="text-gray-700 mb-2">Amneesh ma'am and her team are doing some excellent work in helping students planning for abroad studies. The team is extremely professional and will guide you during the entire process, from tailoring the SOP to the VISA process. I would recommend SOP-Edits to every student planning for abroad studies.</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Data Science</span>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxu9iHxygYxBlKKC_zHGgfH0uTQSZ6z7f2A&s" alt="Central Michigan University" className="h-6 w-auto ml-auto" />
              </div>
            </div>
            {/* Card 5 */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://randomuser.me/api/portraits/women/36.jpg" alt="Shreya" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Humam Ahmad</div>
                  <div className="text-gray-500 text-sm">Noida ⟶ Dubai</div>
                </div>
              </div>
              <div className="text-gray-700 mb-2">SOP-Edits is one of the best overseas consultancy I have come across. They understand your goals for your future and recommend the best course in the place location/university. Professional Environment, Skill-full people, with a holistic approach. Much recommended!</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Management</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Shield_of_the_University_of_Birmingham.svg/330px-Shield_of_the_University_of_Birmingham.svg.png" alt="BSBI" className="h-6 w-auto ml-auto" />
              </div>
            </div>
            {/* Card 6 */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://randomuser.me/api/portraits/women/37.jpg" alt="Hanna" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900">Harleen Kaur</div>
                  <div className="text-gray-500 text-sm">Maharashtra ⟶ Canada</div>
                </div>
              </div>
              <div className="text-gray-700 mb-2">Had a wonderful experience with SOP-Edits, the team is very knowledgeable and guided my brother throughout the process. They give emphasis to your priorities and guide you keeping your ambitions in mind .</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Data Science</span>
                <img src="https://www.leeds.ac.uk/site/custom_scripts/campus_map/imgs/icons/loading.png" alt="Humber" className="h-6 w-auto ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Fifth Section: Study Abroad from Delhi NCR */}
      <section className="bg-[#f6fbff] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-4xl font-extrabold mb-8">
            Study Abroad with <span className="text-blue-500">SOP-Edits Overseas</span>
          </h2>
          <p className="text-lg text-gray-500 mb-4">
            Students from Delhi are known for their ambition and academic capabilities Therefore it only feels natural that Delhi is one of the Indian states sending the most number of students abroad.
          </p>
          <p className="text-lg text-gray-500 mb-6">
            Whether you have decided to study abroad or are thinking about it you are about to make one of the most important decisions in your life. However there is a lot to focus on – from which university and course would be the best to how to find the most affordable and safe accommodation in an entirely new place.
          </p>
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline text-lg focus:outline-none"
            onClick={() => setShowMoreDelhi(!showMoreDelhi)}
          >
            {showMoreDelhi ? "Read less ..." : "Read more ..."}
          </button>
          {showMoreDelhi && (
            <div className="mt-6 text-gray-600 text-base bg-white rounded-xl p-6 shadow">
              <p className="mb-2">Delhi NCR has emerged as a major hub for students aspiring to study abroad, thanks to its world-class schools, coaching centers, and a culture that values global exposure. SOP-Edits has helped thousands of students from Delhi NCR secure admissions to top universities worldwide, providing end-to-end support from profile building to visa counseling.</p>
              <p>Our expert team understands the unique needs of Delhi students and offers personalized guidance to help you choose the right course, university, and country. We also assist with scholarships, education loans, and pre-departure preparations, ensuring a smooth transition to your dream destination.</p>
            </div>
          )}
        </div>
      </section>
      {/* Founder Notes Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-10">
            <span className="text-blue-500">Founder's</span> Note
          </h2>
          <div className="flex flex-col items-center max-w-full mx-auto bg-[#f6fbff] rounded-2xl shadow-md p-8">
            {/* Founder Image Top Centered Circle */}
            <div className="flex justify-center mb-6">
              <img
                src="/pic.png"
                alt="Founder"
                className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-blue-100"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">Amaneesh Kaur Chandi</h3>
            <div className="text-blue-600 font-semibold mb-4 text-center">Founder & Director</div>
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              Director, Lead Consultant and Profile Building Expert at SOP-Edits Overseas, holds a B. Tech in Computer Engineering, a diploma in Strategic Management from the London School of Economics, an MBA from ESADE Business School, Barcelona and a Masters in Global Business from Georgetown University, USA. She worked as a Chief Technology Analyst at J.P. Morgan before beginning her career as an Education Counsellor.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Videos Slider */}
      <section className="bg-[#f6fbff] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-10">
            <span className="text-blue-500">Student</span> Testimonials
          </h2>
          <div className="relative">
            <div id="video-slider" className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none' }}>
              {["https://www.youtube.com/embed/GicV4q1KOrA", "https://www.youtube.com/embed/cnoQChiFOHc", "https://www.youtube.com/embed/p5CZfea7QMI", "https://www.youtube.com/embed/a9l7238vyWM", "https://www.youtube.com/embed/ErQlsP5clGU"].map((src, i) => (
                <div key={i} className="min-w-[80%] sm:min-w-[48%] md:min-w-[24%] bg-white rounded-xl shadow-lg overflow-hidden snap-center">
                  <iframe
                    width="100%"
                    height="400"
                    src={src}
                    title={`YouTube video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button type="button" aria-label="Previous" className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50" onClick={() => {
                const el = document.getElementById('video-slider');
                if (el) el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
              }}>Prev</button>
              <button type="button" aria-label="Next" className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50" onClick={() => {
                const el = document.getElementById('video-slider');
                if (el) el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
              }}>Next</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 pt-8 pb-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <img src="https://sopedits.com/wp-content/uploads/2024/04/091.png" alt="SOP-Edits Logo" className="h-20 mb-2" />
            {/* <div className="text-gray-500 text-lg mb-2">A plan for every dream</div>cls */}
          </div>
          <div className="flex flex-col md:items-end gap-2 md:gap-4">
            <a href="#" className="text-gray-500 text-lg hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-lg hover:underline">Terms & Conditions</a>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-gray-500 text-lg mb-1">Copyright © 2025, SOP-Edits</div>
          <div className="text-gray-500 text-lg">All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
