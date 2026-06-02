'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../informational.module.css';

export default function ImpactsPage() {
  const [activeTab, setActiveTab] = useState<'ecological' | 'social'>('ecological');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navbar />
      
      <main style={{ flex: 1 }}>
        <div className={styles.container}>
          
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.heroTitle} style={{ maxWidth: '900px', margin: '0 auto var(--spacing-4) auto' }}>
              Environmental, Ecological, Hydrological, Social, Economic, and Governance Impacts of Sand Mining in India
            </h1>
            <p className={styles.heroSubtitle} style={{ maxWidth: '800px' }}>
              A comprehensive analysis of the systemic, multi-dimensional consequences of unregulated sand extraction across sensitive Indian river basins and coastal zones.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.tabContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'ecological' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('ecological')}
            >
              ENVIRONMENTAL &amp; ECOLOGICAL DEGRADATION
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'social' ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab('social')}
            >
              SOCIAL, ECONOMIC &amp; GOVERNANCE IMPACTS
            </button>
          </div>

          {activeTab === 'ecological' && (
            <div className="tab-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              {/* Section 1: Geomorphological and River Morphology Impacts */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 01: GEOMORPHOLOGY &amp; RIVER SYSTEMS</div>
                <h2 className={styles.sectionTitle}>1. Geomorphological and River Morphology Impacts</h2>
                <p className={styles.sectionText}>
                  Sand mining has emerged as one of the most significant environmental challenges affecting river systems across India. The extraction of sand from riverbeds at rates exceeding natural replenishment disrupts the geomorphological stability of rivers, leading to channel incision, riverbed lowering, bank erosion, and channel migration. As sediment is removed, rivers lose their natural equilibrium, causing flow velocities to increase and banks to become unstable. This often results in the collapse of riverbanks, loss of agricultural land, damage to infrastructure, and alterations in river courses. Furthermore, the removal of sediment disrupts the natural sediment budget, reducing sediment transport to downstream floodplains, deltas, and coastal regions, thereby contributing to coastal erosion and long-term landscape degradation.
                </p>
              </div>

              {/* Section 2: Hydrological Impacts and Groundwater Disruption */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 02: HYDROLOGY &amp; GROUNDWATER</div>
                <h2 className={styles.sectionTitle}>2. Hydrological Impacts and Groundwater Disruption</h2>
                <p className={styles.sectionText}>
                  The hydrological consequences of sand mining are equally severe. River sand functions as a natural storage medium that facilitates groundwater recharge and maintains hydraulic connectivity between rivers and adjacent aquifers. Excessive extraction reduces the capacity of river systems to store and gradually release water, leading to declining groundwater tables and reduced dry-season flows. Deep excavation pits can disconnect rivers from alluvial aquifers, disrupting groundwater recharge processes and threatening water security for communities dependent on wells and shallow groundwater systems. Additionally, the removal of sandbars and floodplain sediments diminishes the river's natural flood-buffering capacity, increasing flood intensity and exacerbating the impacts of extreme rainfall events.
                </p>
              </div>

              {/* Section 3: Ecological and Biodiversity Impacts */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 03: ECOLOGICAL &amp; BIODIVERSITY DEGRADATION</div>
                <h2 className={styles.sectionTitle}>3. Ecological and Biodiversity Impacts</h2>
                <p className={styles.sectionText}>
                  Ecologically, sand mining causes extensive degradation of riverine habitats. Sandbars, pools, riffles, floodplain wetlands, and riparian vegetation provide essential habitat for numerous aquatic and terrestrial species. Their removal results in habitat fragmentation, loss of breeding and nesting sites, and disruption of ecological processes. Species such as the gharial, Gangetic river dolphin, freshwater turtles, Indian skimmer, and several native fish species are particularly vulnerable because they depend on stable sandy riverbanks and healthy river ecosystems. The destruction of spawning grounds, increased turbidity, and alteration of flow regimes contribute to declining fish populations, which in turn affect predators and destabilize aquatic food webs. These impacts are especially concerning in biodiversity hotspots such as the National Chambal Sanctuary, where illegal sand mining threatens critically endangered species and undermines conservation efforts.
                </p>
              </div>

              {/* Section 4: Water Quality and Pollution Impacts */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 04: WATER QUALITY &amp; POLLUTION</div>
                <h2 className={styles.sectionTitle}>4. Water Quality and Pollution Impacts</h2>
                <p className={styles.sectionText}>
                  Sand mining also degrades water quality through increased turbidity, sediment suspension, and pollution from mining machinery. Elevated sediment concentrations reduce light penetration, impair photosynthesis, and negatively affect aquatic organisms by clogging fish gills and disrupting feeding and reproductive behaviour. The use of excavators, dredgers, and transport vehicles introduces oils, fuels, and other contaminants into river systems. In addition, the removal of riparian vegetation reduces the natural filtration capacity of riverbanks, allowing greater quantities of pollutants and sediments to enter water bodies. These changes can compromise drinking water sources and increase treatment costs for communities reliant on river-connected groundwater supplies.
                </p>
              </div>

              {/* Section 6: Climate Change and Disaster Risk Impacts */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 05: CLIMATE CHANGE &amp; DISASTER RISKS</div>
                <h2 className={styles.sectionTitle}>6. Climate Change and Disaster Risk Impacts</h2>
                <p className={styles.sectionText}>
                  The impacts of sand mining extend beyond environmental degradation to encompass broader climate and disaster-related risks. Healthy river systems and floodplains play a critical role in regulating floods and dissipating flood energy. By removing sediments and destabilizing river channels, sand mining reduces the resilience of river systems to extreme weather events. Floodwaters can travel more rapidly through incised channels, increasing erosion and causing greater damage to infrastructure and settlements. In coastal regions, beach and dune sand mining further increases vulnerability to storm surges, cyclones, and sea-level rise by removing natural protective barriers. As climate change intensifies rainfall variability and extreme weather events, degraded river systems become increasingly susceptible to catastrophic flooding and associated losses.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="tab-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
              {/* Section 5: Agricultural and Rural Livelihood Impacts */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 01: AGRICULTURE &amp; RURAL LIVELIHOODS</div>
                <h2 className={styles.sectionTitle}>5. Agricultural and Rural Livelihood Impacts</h2>
                <p className={styles.sectionText}>
                  Agricultural systems are significantly affected by the hydrological and geomorphological changes associated with sand mining. Lower groundwater levels reduce the availability of irrigation water, increasing dependence on deeper and more expensive borewells. At the same time, riverbank erosion consumes productive agricultural land and damages rural infrastructure. The disruption of seasonal flooding also limits the deposition of nutrient-rich alluvial sediments that naturally replenish soil fertility. Consequently, farmers may experience declining crop yields, increased input costs, and greater vulnerability to drought conditions, particularly in regions where livelihoods are closely linked to river ecosystems.
                </p>
              </div>

              {/* Section 7: Social and Livelihood Impacts */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 02: SOCIAL VULNERABILITY</div>
                <h2 className={styles.sectionTitle}>7. Social and Livelihood Impacts</h2>
                <p className={styles.sectionText}>
                  The social consequences of sand mining are particularly pronounced among vulnerable communities. Fishing communities often experience declining fish catches due to habitat destruction and reduced aquatic productivity, directly affecting livelihoods and food security. Farmers face reduced water availability, land loss from erosion, and declining agricultural productivity. In many cases, riverbank instability and channel migration force households to relocate, resulting in displacement and social disruption. The unequal distribution of costs and benefits is a recurring issue, with local communities bearing the environmental and economic burdens while profits are frequently concentrated among mining operators and intermediaries.
                </p>
              </div>

              {/* Section 8: Governance and Institutional Challenges */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 03: GOVERNANCE &amp; INSTITUTIONAL CHALLENGES</div>
                <h2 className={styles.sectionTitle}>8. Governance and Institutional Challenges</h2>
                <p className={styles.sectionText}>
                  Governance challenges represent one of the most persistent dimensions of India's sand mining crisis. Despite the existence of regulatory frameworks, enforcement remains weak in many regions due to institutional limitations, corruption, and political influence. Illegal mining operations often operate through organised criminal networks commonly referred to as sand mafias, which exploit regulatory gaps and engage in intimidation, violence, and illegal extraction. The resulting governance failures contribute to revenue losses, environmental degradation, and declining public trust in institutions. Consequently, judicial bodies such as the National Green Tribunal and the Supreme Court have increasingly intervened to address regulatory shortcomings and enforce environmental safeguards.
                </p>
              </div>

              {/* Section 9: Economic Impacts and Long-Term Costs */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>SECTION 04: ECONOMIC &amp; SYSTEMIC COST ANALYSIS</div>
                <h2 className={styles.sectionTitle}>9. Economic Impacts and Long-Term Costs</h2>
                <p className={styles.sectionText}>
                  Economically, while sand mining generates short-term revenue and supports the construction sector, its long-term costs are substantial. River degradation, groundwater depletion, biodiversity loss, agricultural decline, infrastructure damage, and increased disaster vulnerability impose significant economic burdens on governments and communities. These hidden costs often exceed the immediate benefits derived from extraction, highlighting the need for more sustainable resource management approaches. Collectively, the evidence suggests that sand mining should be understood not merely as a mining activity but as a systemic environmental governance challenge with far-reaching implications for ecological integrity, water security, climate resilience, and sustainable development in India.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
