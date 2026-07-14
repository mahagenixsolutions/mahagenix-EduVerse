import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { schoolInfo, principalMessage, schoolTimeline, schoolClubs, galleryImages, teachersDirectory, emergencyContacts } from '@/mock/community';
import { MapPin, Phone, Mail, Users, GraduationCap, Clock, AlertTriangle } from 'lucide-react';
import styles from './school.module.css';

export const SchoolPage: React.FC = () => {
  return (
    <div className={styles.schoolPage}>
      {/* School Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay}>
          <h1>{schoolInfo.name}</h1>
          <p className={styles.motto}>"{schoolInfo.motto}"</p>
          <div className={styles.bannerMeta}>
            <span><MapPin size={14} /> {schoolInfo.address}</span>
            <span><Phone size={14} /> {schoolInfo.phone}</span>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className={styles.principalSection}>
        <Card className={styles.principalCard}>
          <div className={styles.principalHeader}>
            <Avatar src={principalMessage.avatar} alt={principalMessage.name} size="lg" />
            <div>
              <p className={styles.principalTitle}>Principal's Message</p>
              <p className={styles.principalName}>{principalMessage.name} • {principalMessage.date}</p>
            </div>
          </div>
          <blockquote className={styles.quote}>{principalMessage.message}</blockquote>
        </Card>
      </section>

      {/* Academic Timeline */}
      <section>
        <h2 className={styles.sectionTitle}>Academic Timeline</h2>
        <div className={styles.timeline}>
          {schoolTimeline.map((event, idx) => (
            <div key={event.id} className={styles.timelineRow}>
              <div className={styles.timelineDateCol}>
                <span className={styles.timelineDateText}>{event.date}</span>
              </div>
              <div className={styles.timelineConnector}>
                <div className={styles.timelineNode}>{event.icon}</div>
                {idx < schoolTimeline.length - 1 && <div className={styles.timelineStem} />}
              </div>
              <Card className={`${styles.timelineEvent} hover-lift`}>
                <p className={styles.listItemTitle}>{event.title}</p>
                <span className={styles.timelineType}>{event.type}</span>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Clubs */}
      <section>
        <h2 className={styles.sectionTitle}>School Clubs</h2>
        <div className={styles.clubsGrid}>
          {schoolClubs.map(club => (
            <Card key={club.id} hoverable className={styles.clubCard}>
              <div className={styles.clubIcon} style={{ backgroundColor: `${club.color}15`, color: club.color }}>
                <span>{club.icon}</span>
              </div>
              <p className={styles.listItemTitle}>{club.name}</p>
              <p className={styles.clubDesc}>{club.description}</p>
              <span className={styles.clubMembers}><Users size={14} /> {club.members} members</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section>
        <h2 className={styles.sectionTitle}>Campus Gallery</h2>
        <div className={styles.galleryGrid}>
          {galleryImages.map(img => (
            <div key={img.id} className={styles.galleryItem}>
              <img src={img.src} alt={img.caption} />
              <div className={styles.galleryOverlay}>
                <span className={styles.galleryCat}>{img.category}</span>
                <p>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers Directory */}
      <section>
        <h2 className={styles.sectionTitle}>Teachers Directory</h2>
        <div className={styles.teachersGrid}>
          {teachersDirectory.map(teacher => (
            <Card key={teacher.id} className={styles.teacherCard}>
              <Avatar src={teacher.avatar} alt={teacher.name} size="lg" />
              <p className={styles.listItemTitle}>{teacher.name}</p>
              <p className={styles.teacherSubject}>{teacher.subject}</p>
              <span className={styles.teacherDept}>{teacher.department} • {teacher.experience}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section>
        <h2 className={styles.sectionTitle}>Emergency Contacts</h2>
        <div className={styles.contactsRow}>
          {emergencyContacts.map((c, i) => (
            <Card key={i} className={styles.contactCard}>
              <AlertTriangle size={18} color="var(--danger)" />
              <div>
                <p className={styles.listItemTitle}>{c.label}</p>
                <p>{c.number}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
