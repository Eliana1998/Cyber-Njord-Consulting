import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Crosshair,
  Database,
  ExternalLink,
  Factory,
  FileCheck2,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers3,
  Menu,
  Network,
  Radar,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type ServiceCategory = 'Assess' | 'Build' | 'Operate' | 'Prepare';

const services: Array<{
  id: string;
  number: string;
  category: ServiceCategory;
  icon: typeof Radar;
  title: string;
  copy: string;
  outputs: string[];
}> = [
  {
    id: 'exposure',
    number: '01',
    category: 'Assess',
    icon: Radar,
    title: 'Exposure & attack-path assessment',
    copy: 'A consequence-led view of how identities, network paths, vulnerabilities, and operational dependencies combine into material exposure.',
    outputs: ['System map', 'Prioritised attack paths', 'Decision brief'],
  },
  {
    id: 'penetration-testing',
    number: '02',
    category: 'Assess',
    icon: Crosshair,
    title: 'Penetration testing for IT / OT boundaries',
    copy: 'Rules-of-engagement-led testing for exposed services, remote access, identity paths, and selected industrial interfaces — designed to produce evidence without unsafe disruption.',
    outputs: ['Test plan & guardrails', 'Validated findings', 'Remediation workshop'],
  },
  {
    id: 'architecture',
    number: '03',
    category: 'Build',
    icon: Network,
    title: 'Architecture & resilience',
    copy: 'Targeted design work for segmentation, remote access, recovery, high-availability, and the controls that make an architecture easier to defend.',
    outputs: ['Zone model', 'Resilience patterns', '90-day roadmap'],
  },
  {
    id: 'intelligence',
    number: '04',
    category: 'Operate',
    icon: Database,
    title: 'Vulnerability & patch intelligence',
    copy: 'Turn reference intelligence into an operating rhythm. Map advisories to assets, compensating controls, exploitability, and maintenance windows.',
    outputs: ['Triage rules', 'Patch decisions', 'Evidence trail'],
  },
  {
    id: 'readiness',
    number: '05',
    category: 'Prepare',
    icon: FileCheck2,
    title: 'Compliance readiness',
    copy: 'Evidence-led preparation for CRA, NIS2, ISO/IEC 27001, and ISO/IEC 62443 without confusing readiness work for legal advice or certification.',
    outputs: ['Control map', 'Evidence pack', 'Leadership readout'],
  },
  {
    id: 'recovery',
    number: '06',
    category: 'Operate',
    icon: RefreshCw,
    title: 'Disaster recovery & operational resilience',
    copy: 'Turn a cyber disruption into a controlled recovery decision: stabilise the situation, restore from known-good points, validate safety and integrity, and return to operation with evidence.',
    outputs: ['Recovery strategy', 'Restore test', 'Return-to-operation plan'],
  },
  {
    id: 'attestation',
    number: '07',
    category: 'Prepare',
    icon: ShieldCheck,
    title: 'Security attestation & evidence',
    copy: 'A structured, reviewable statement of security posture backed by scoped evidence, control ownership, exceptions, and a clear validity period.',
    outputs: ['Scope & assertion', 'Evidence index', 'Management readout'],
  },
];

const approach = [
  ['01', 'Listen to the system', 'Start with the processes, dependencies, people, and constraints that keep the organisation running.'],
  ['02', 'Find the meaningful exposure', 'Combine technical evidence with consequence. Separate a noisy list from the paths that deserve attention now.'],
  ['03', 'Make the next move obvious', 'Leave your team with decisions they can defend, communicate, and execute without manufacturing urgency.'],
];

const sectorModels = [
  {
    code: '01 / FINANCE',
    title: 'Financial institutions',
    copy: 'Threat-led security work for banks, payment providers, insurers, investment firms, and other organisations where identity, availability, transaction integrity, and third-party access are business-critical.',
    icon: BriefcaseBusiness,
    outputs: ['Crown-jewel dependency model', 'Privileged access paths', 'Assurance evidence'],
    accent: 'teal',
  },
  {
    code: '02 / OT · IT · ICS',
    title: 'Industrial and critical operations',
    copy: 'Practical modelling for manufacturing, energy, utilities, transport, buildings, and other environments where cyber decisions can change a physical process or safety outcome.',
    icon: Factory,
    outputs: ['Zone and conduit model', 'Attack-path rehearsal', 'Recovery assumptions'],
    accent: 'orange',
  },
  {
    code: '03 / EDUCATION',
    title: 'Universities, schools & academies',
    copy: 'Context-aware support for open, distributed environments with research systems, student services, identity platforms, safeguarding responsibilities, and lean security teams.',
    icon: GraduationCap,
    outputs: ['Campus trust model', 'Identity and access review', 'Incident-ready playbook'],
    accent: 'teal',
  },
  {
    code: '04 / MODELLING',
    title: 'System modelling',
    copy: 'Make the environment visible before deciding what to test, protect, accept, or change. Model assets, dependencies, attack paths, consequence, and recovery in one working picture.',
    icon: Boxes,
    outputs: ['Asset dependency map', 'Scenario risk model', 'Decision visualisation'],
    accent: 'orange',
  },
];

const bundles = [
  {
    code: 'PACKET / NORTHSTAR',
    title: 'Know your exposure',
    copy: 'A focused assessment for a leadership team facing an investment, audit, acquisition, or architecture decision.',
    use: 'Best for: unclear risk ownership',
    includes: ['System and dependency map', 'Two prioritised attack paths', 'Leadership decision brief'],
    accent: 'teal',
  },
  {
    code: 'PACKET / BREAKWATER',
    title: 'Make the boundary hold',
    copy: 'A practical IT / OT or cloud / plant engagement that turns a fragile boundary into an observable, governable design.',
    use: 'Best for: segmentation and remote access',
    includes: ['Zone and conduit model', 'Access and recovery patterns', 'Implementation sequence'],
    accent: 'orange',
  },
  {
    code: 'PACKET / WATCHTOWER',
    title: 'Keep the signal current',
    copy: 'A repeatable reference-intelligence rhythm for teams that need to decide what to patch, monitor, accept, or verify.',
    use: 'Best for: lean security operations',
    includes: ['Asset-to-advisory mapping', 'Monthly triage clinic', 'Evidence-ready decision log'],
    accent: 'teal',
  },
  {
    code: 'PACKET / REDLINE',
    title: 'Test the boundary safely',
    copy: 'A bounded penetration-testing engagement for teams that need to validate whether a credible path can cross from exposure into impact.',
    use: 'Best for: external surface and remote access',
    includes: ['Rules of engagement', 'Evidence-led findings', 'Remediation retest'],
    accent: 'orange',
  },
  {
    code: 'PACKET / PROOF',
    title: 'Make the claim defensible',
    copy: 'An attestation-ready evidence pack that turns security assertions into a scoped, reviewable position for customers, boards, or assurance partners.',
    use: 'Best for: assurance and customer diligence',
    includes: ['Scope and assertion statement', 'Control evidence index', 'Exceptions and validity window'],
    accent: 'teal',
  },
];

const exampleProducts = [
  {
    id: 'resilience-map',
    name: 'Critical-Service Resilience Map',
    label: 'Finance / essential services',
    copy: 'A working model of critical services, identity, payment or operational dependencies, supplier touchpoints, and disruption tolerances.',
    includes: ['Service dependency map', 'Impact and recovery priorities', 'Board-ready decision brief'],
    icon: BriefcaseBusiness,
    accent: 'teal',
  },
  {
    id: 'recovery-rehearsal',
    name: 'Recovery Rehearsal Kit',
    label: 'OT / IT / ICS',
    copy: 'A facilitated scenario and evidence pack to rehearse containment, safe-state decisions, restore order, and controlled return to production.',
    includes: ['Scenario injects', 'Role and decision cards', 'Restore validation checklist'],
    icon: RefreshCw,
    accent: 'orange',
  },
  {
    id: 'campus-model',
    name: 'Campus Cyber Resilience Model',
    label: 'Universities / schools / academies',
    copy: 'A practical view of identity, learning services, research, student data, safeguarding dependencies, and continuity priorities.',
    includes: ['Campus trust map', 'Priority service tiers', 'Incident coordination prompts'],
    icon: GraduationCap,
    accent: 'teal',
  },
  {
    id: 'system-risk-explorer',
    name: 'System Risk Explorer',
    label: 'Interactive modelling',
    copy: 'A tailored model linking architecture components to attack scenarios, consequence, reachability, recovery confidence, and defensive actions.',
    includes: ['Layered architecture view', 'Scenario-specific attack paths', 'Component and system risk lenses'],
    icon: Boxes,
    accent: 'orange',
  },
];

const topologyNodes = [
  { id: 'enterprise', label: 'Enterprise IT', sub: 'Identity · ERP · users', x: 10, y: 20, tone: 'teal' },
  { id: 'dmz', label: 'DMZ / boundary', sub: 'Jump hosts · broker', x: 39, y: 44, tone: 'orange' },
  { id: 'ot', label: 'OT / ICS', sub: 'SCADA · PLC · HMI', x: 67, y: 21, tone: 'teal' },
  { id: 'safety', label: 'Safety layer', sub: 'SIS · interlocks', x: 82, y: 69, tone: 'lime' },
  { id: 'cloud', label: 'Cloud / remote', sub: 'Vendor access · SaaS', x: 44, y: 78, tone: 'violet' },
];

const topologyScenarios = {
  overview: {
    label: 'Full system',
    note: 'Normal operating context',
    copy: 'The useful question is not “is there a firewall?” It is whether identity, trust boundaries, and recovery assumptions still hold together.',
    active: ['enterprise', 'dmz', 'ot', 'safety', 'cloud'],
  },
  vendor: {
    label: 'Vendor access',
    note: 'Remote maintenance path',
    copy: 'Remote access is a business dependency. Make the route time-bound, attributable, brokered, and visible at the point where it touches operations.',
    active: ['cloud', 'dmz', 'ot'],
  },
  disruption: {
    label: 'Disruption lens',
    note: 'Loss of availability',
    copy: 'A high-severity finding is not automatically the highest consequence. Follow the path to the process, safety function, and recovery decision.',
    active: ['dmz', 'ot', 'safety'],
  },
} as const;

const attackNodes = [
  { id: 'internet', label: 'Internet', sub: 'External signal', x: 7, y: 44, kind: 'entry' },
  { id: 'identity', label: 'Identity plane', sub: 'SSO / MFA', x: 28, y: 20, kind: 'control' },
  { id: 'vendor', label: 'Vendor portal', sub: 'Remote access', x: 29, y: 70, kind: 'entry' },
  { id: 'jump', label: 'Jump host', sub: 'Boundary asset', x: 52, y: 44, kind: 'pivot' },
  { id: 'hmi', label: 'HMI / SCADA', sub: 'Operator view', x: 75, y: 23, kind: 'impact' },
  { id: 'plc', label: 'PLC cell', sub: 'Control logic', x: 76, y: 68, kind: 'impact' },
];

const attackEdges = [
  ['internet', 'identity'],
  ['internet', 'vendor'],
  ['identity', 'jump'],
  ['vendor', 'jump'],
  ['jump', 'hmi'],
  ['jump', 'plc'],
  ['hmi', 'plc'],
];

const attackDetails: Record<string, { why: string; move: string; cue: string }> = {
  internet: {
    why: 'Public reachability is a starting condition, not a finding by itself. The question is what can be proven about the next hop.',
    move: 'Reduce exposed surface, verify ownership, and make the intended path explicit.',
    cue: 'Surface',
  },
  identity: {
    why: 'A trusted identity can cross more boundaries than a vulnerable server. Privilege and session context are the connective tissue.',
    move: 'Use phishing-resistant MFA where practical, review privilege, and log high-consequence access.',
    cue: 'Trust broker',
  },
  vendor: {
    why: 'Supplier access often inherits urgency and broad permissions. A dormant account can become a quiet route into operations.',
    move: 'Broker access through named, time-bound sessions with approval and recording.',
    cue: 'External path',
  },
  jump: {
    why: 'Boundary hosts concentrate trust. Their hardening, telemetry, and egress rules influence every connected zone.',
    move: 'Treat the jump host as a monitored control point, not a convenient desktop.',
    cue: 'Pivot point',
  },
  hmi: {
    why: 'The operator interface can expose process context and influence control decisions even when the underlying controller is isolated.',
    move: 'Constrain east-west access, validate change paths, and rehearse operator-safe recovery.',
    cue: 'Operational impact',
  },
  plc: {
    why: 'Controller integrity and availability carry physical consequence. The right defensive move respects production and safety constraints.',
    move: 'Protect engineering paths, verify known-good logic, and align recovery with the process owner.',
    cue: 'High consequence',
  },
};

const systemAssets = [
  { id: 'gateway', label: 'Edge gateway', zone: 'DMZ', detail: 'Brokered ingress and egress', score: 62, x: 13, y: 35, color: 'orange' },
  { id: 'identity', label: 'Identity core', zone: 'Enterprise', detail: 'Privileged access and federation', score: 48, x: 35, y: 18, color: 'teal' },
  { id: 'historian', label: 'Historian', zone: 'OT', detail: 'Process data and reporting', score: 71, x: 59, y: 38, color: 'orange' },
  { id: 'controller', label: 'Controller cell', zone: 'OT', detail: 'Logic and actuation', score: 79, x: 75, y: 67, color: 'red' },
  { id: 'recovery', label: 'Recovery vault', zone: 'Resilience', detail: 'Offline restore point', score: 31, x: 38, y: 73, color: 'lime' },
  { id: 'safety', label: 'Safety interlock', zone: 'Safety', detail: 'SIS and process guardrails', score: 68, x: 78, y: 86, color: 'lime' },
  { id: 'process', label: 'Physical process', zone: 'Physical', detail: 'Actuation and production outcome', score: 74, x: 91, y: 42, color: 'red' },
];

const systemEdges = [
  ['gateway', 'identity'],
  ['gateway', 'historian'],
  ['identity', 'controller'],
  ['historian', 'controller'],
  ['controller', 'safety'],
  ['controller', 'process'],
  ['recovery', 'controller'],
] as const;

const architectureLayers = [
  {
    id: 'governance',
    number: 'LAYER 01',
    label: 'Governance & external trust',
    description: 'The people, obligations, and external relationships that define what the system must protect and who can influence it.',
    tone: 'violet',
    components: [
      { id: 'board', label: 'Board & risk owners', detail: 'Consequence, appetite, and accountability' },
      { id: 'regulators', label: 'Regulators & assurance', detail: 'Reporting, oversight, and evidence expectations' },
      { id: 'suppliers', label: 'Suppliers & partners', detail: 'Third-party dependencies and access agreements' },
      { id: 'identity-provider', label: 'Identity provider', detail: 'Federation, authentication, and trust claims', assetId: 'identity' },
    ],
  },
  {
    id: 'enterprise',
    number: 'LAYER 02',
    label: 'Enterprise IT & information',
    description: 'The services that hold identity, business data, communication, and the operational context used by decision-makers.',
    tone: 'teal',
    components: [
      { id: 'directory', label: 'Directory & SSO', detail: 'Users, roles, groups, and privileged identity', assetId: 'identity' },
      { id: 'endpoints', label: 'Endpoints & admin tools', detail: 'Workstations, management clients, and support access' },
      { id: 'business-apps', label: 'Business applications', detail: 'ERP, finance, HR, and customer-facing systems' },
      { id: 'recovery-data', label: 'Backup & recovery data', detail: 'Restore points, retention, and recovery evidence', assetId: 'recovery' },
    ],
  },
  {
    id: 'boundary',
    number: 'LAYER 03',
    label: 'Boundary & integration',
    description: 'The control points where trust zones meet: remote access, APIs, firewalls, brokers, and the paths that need to be attributable.',
    tone: 'orange',
    components: [
      { id: 'firewall', label: 'Firewalls & segmentation', detail: 'Zones, conduits, filtering, and enforcement' },
      { id: 'remote-access', label: 'Remote access broker', detail: 'Named, time-bound supplier and admin sessions', assetId: 'gateway' },
      { id: 'jump-host', label: 'Jump host', detail: 'Monitored pivot point into protected zones' },
      { id: 'integration-gateway', label: 'API & data gateway', detail: 'Protocol translation and controlled exchange', assetId: 'gateway' },
    ],
  },
  {
    id: 'control',
    number: 'LAYER 04',
    label: 'OT / ICS control',
    description: 'The systems that observe, supervise, configure, and command the industrial process under production constraints.',
    tone: 'teal',
    components: [
      { id: 'hmi-scada', label: 'HMI / SCADA', detail: 'Operator view, alarms, and supervisory control', assetId: 'historian' },
      { id: 'historian', label: 'Historian & telemetry', detail: 'Process data, timing, and operational evidence', assetId: 'historian' },
      { id: 'engineering', label: 'Engineering workstation', detail: 'Logic changes, commissioning, and maintenance' },
      { id: 'controller-cell', label: 'PLC / controller cell', detail: 'Logic, setpoints, and actuation authority', assetId: 'controller' },
    ],
  },
  {
    id: 'physical',
    number: 'LAYER 05',
    label: 'Safety & physical process',
    description: 'The protection functions and real-world outcomes that determine the consequence of a cyber event.',
    tone: 'lime',
    components: [
      { id: 'sis', label: 'Safety instrumented system', detail: 'Independent trips, interlocks, and safe states', assetId: 'safety' },
      { id: 'sensors', label: 'Sensors & actuators', detail: 'Signals and commands at the process edge' },
      { id: 'physical-process', label: 'Physical process', detail: 'Production, quality, availability, and safety outcome', assetId: 'process' },
      { id: 'safe-stop', label: 'Safe stop & recovery', detail: 'Controlled stop, restore, and restart criteria', assetId: 'recovery' },
    ],
  },
] as const;

const recoveryPhases = [
  {
    id: 'declare',
    number: '01',
    label: 'Detect & declare',
    title: 'Create one trusted situation picture.',
    copy: 'Confirm what is known, name the incident lead, protect decision logs, and distinguish service degradation from a safety-critical condition.',
    evidence: ['Situation log', 'Decision owner', 'Initial scope'],
    tone: 'teal',
  },
  {
    id: 'contain',
    number: '02',
    label: 'Contain & stabilise',
    title: 'Stop the spread without losing control.',
    copy: 'Apply the least-disruptive isolation that protects people, operations, identities, and recovery copies while preserving the evidence needed to understand the event.',
    evidence: ['Containment actions', 'Access freeze', 'Safety check'],
    tone: 'orange',
  },
  {
    id: 'restore',
    number: '03',
    label: 'Restore known-good',
    title: 'Bring back the right thing, in the right order.',
    copy: 'Use protected restore points and agreed dependencies. Restore identity, visibility, control, and business services in an order the process owner can defend.',
    evidence: ['Restore point', 'Dependency order', 'Technical sign-off'],
    tone: 'teal',
  },
  {
    id: 'validate',
    number: '04',
    label: 'Validate safety & integrity',
    title: 'Prove the system is safe to trust again.',
    copy: 'Test commands, configuration, access, telemetry, interlocks, and business controls before declaring the service recovered.',
    evidence: ['Validation script', 'Control checks', 'Owner acceptance'],
    tone: 'lime',
  },
  {
    id: 'resume',
    number: '05',
    label: 'Resume & learn',
    title: 'Return to operation with a record.',
    copy: 'Resume in measured steps, monitor for recurrence, capture lessons, and convert the recovery experience into better architecture and rehearsal.',
    evidence: ['Return-to-operation plan', 'Monitoring window', 'Lessons learned'],
    tone: 'violet',
  },
] as const;

const recoveryScenarios = {
  finance: {
    label: 'Financial institution',
    context: 'Prioritise transaction integrity, privileged access, customer communication, and regulatory evidence while protecting critical payment and settlement dependencies.',
  },
  industrial: {
    label: 'OT / IT / ICS operator',
    context: 'Prioritise safe state, process visibility, engineering access, recovery vault isolation, and a controlled restart with operations and safety owners.',
  },
  education: {
    label: 'University / school / academy',
    context: 'Prioritise identity, learning services, safeguarding, research and student data, and a staged return that works for a distributed community.',
  },
} as const;

const attackScenarios = {
  vendor: {
    label: 'Vendor remote access',
    short: 'Third-party path',
    description: 'A supplier session reaches the boundary and attempts to pivot into control and engineering paths.',
    route: ['gateway', 'identity', 'controller', 'process'],
    scores: { gateway: 72, identity: 64, historian: 46, controller: 86, recovery: 38, safety: 74, process: 82 },
    impact: {
      gateway: 'The broker is the first observable decision point for a third-party session.',
      identity: 'A valid vendor identity can turn an access control into a trusted route.',
      historian: 'Process data is useful for reconnaissance, but not the primary impact target.',
      controller: 'Engineering access can change logic, modes, or setpoints if the boundary fails.',
      recovery: 'A reachable recovery path would let an attacker extend disruption.',
      safety: 'Safety functions may be isolated, but shared engineering paths still need proof.',
      process: 'Changes to control logic can translate into unsafe or unavailable production.',
    },
    move: 'Use named, time-bound sessions through a monitored jump path; verify controller logic and close the vendor route after maintenance.',
  },
  ransomware: {
    label: 'Ransomware spillover',
    short: 'IT to OT disruption',
    description: 'A compromise in enterprise IT attempts to cross the boundary and disrupt operations or recovery.',
    route: ['identity', 'gateway', 'historian', 'controller', 'recovery'],
    scores: { gateway: 68, identity: 79, historian: 73, controller: 71, recovery: 88, safety: 42, process: 67 },
    impact: {
      gateway: 'The boundary determines whether enterprise disruption becomes an operational event.',
      identity: 'Central identity compromise can amplify a single endpoint incident across zones.',
      historian: 'Historian availability affects visibility, reporting, and the operator’s picture of the process.',
      controller: 'Controllers may not be directly encrypted, but loss of engineering support can stop a line.',
      recovery: 'Online backups are a high-value target; recovery confidence depends on isolation and proof.',
      safety: 'Safety should fail independently, but shared dependencies must be verified.',
      process: 'The physical outcome is often loss of availability, not a dramatic cyber-physical exploit.',
    },
    move: 'Prove zone separation, protect recovery copies offline, and rehearse a controlled stop and restore with operations.',
  },
  unsafeCommand: {
    label: 'Unsafe control command',
    short: 'Integrity attack',
    description: 'An actor reaches an operator or engineering surface and attempts to alter a process command.',
    route: ['identity', 'gateway', 'historian', 'controller', 'safety', 'process'],
    scores: { gateway: 55, identity: 61, historian: 67, controller: 91, recovery: 29, safety: 84, process: 93 },
    impact: {
      gateway: 'The path should make command origin, approval, and session context attributable.',
      identity: 'Identity assurance matters because a valid account can look like normal operations.',
      historian: 'Historian data can expose command timing and help prove what happened.',
      controller: 'Controller integrity is the critical technical boundary for unsafe or unavailable behavior.',
      recovery: 'Known-good logic and tested restore procedures shorten the path back to safe operation.',
      safety: 'Independent interlocks must be validated as a separate protection layer, not assumed.',
      process: 'The physical process bears the consequence: unsafe state, quality loss, or shutdown.',
    },
    move: 'Constrain command authority, verify engineering changes, and test independent safety behavior under a safe exercise plan.',
  },
} as const;

const vulnerabilityRecords = [
  { id: 'REF-2417', asset: 'Edge gateway', ref: 'CVE-2024-21887', severity: 'Critical', status: 'Triage', source: 'NVD · vendor advisory', note: 'Validate exposure and vendor mitigation before patch window.' },
  { id: 'REF-1882', asset: 'Engineering workstation', ref: 'CVE-2023-34362', severity: 'High', status: 'Planned', source: 'CISA KEV · NVD', note: 'Prioritise if reachable from a supplier or shared admin path.' },
  { id: 'REF-9021', asset: 'Controller cell', ref: 'Vendor bulletin V-19', severity: 'Medium', status: 'Compensating', source: 'Vendor advisory', note: 'No direct patch path in current maintenance window; isolate and monitor.' },
  { id: 'REF-4408', asset: 'Identity core', ref: 'CVE-2024-21410', severity: 'High', status: 'Verified', source: 'NVD · MITRE ATT&CK', note: 'Evidence captured: MFA policy, privileged group review, sign-in telemetry.' },
  { id: 'REF-3150', asset: 'Historian', ref: 'CVE-2022-47966', severity: 'Medium', status: 'Accepted', source: 'NVD · vendor advisory', note: 'Risk acceptance has owner, expiry, and a monitoring control.' },
];

const referenceLinks = [
  ['NVD', 'National Vulnerability Database', 'https://nvd.nist.gov/'],
  ['CISA KEV', 'Known Exploited Vulnerabilities catalog', 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'],
  ['MITRE ATT&CK', 'Adversary tactics and techniques', 'https://attack.mitre.org/'],
  ['Vendor advisories', 'Connect your product-specific feeds', 'https://www.cisa.gov/resources-tools/resources/cybersecurity-advisories'],
];

const mappingLinks = {
  Vulnerability: [
    ['CVE-2024-21887', 'Critical · edge gateway'],
    ['Vendor bulletin V-19', 'Medium · controller cell'],
  ],
  Control: [
    ['AC-6 / least privilege', 'Privileged session review'],
    ['SR 2.1 / authenticity', 'Engineering path verification'],
  ],
  Framework: [
    ['CRA / vulnerability handling', 'Product security evidence'],
    ['ISO/IEC 62443-3-3', 'System security requirements'],
  ],
  'Attack technique': [
    ['T1078 / valid accounts', 'Identity and vendor path'],
    ['T1021 / remote services', 'Brokered jump host access'],
  ],
} as const;

const frameworks = [
  { code: 'CRA', title: 'EU Cyber Resilience Act', copy: 'Product security posture, vulnerability handling, reporting workflow, and technical documentation evidence.', icon: ShieldCheck },
  { code: 'NIS2', title: 'NIS2', copy: 'Governance, risk measures, incident readiness, supply-chain context, and management-level evidence.', icon: BriefcaseBusiness },
  { code: '27001', title: 'ISO/IEC 27001', copy: 'Information-security management evidence, risk treatment, control ownership, and continual improvement.', icon: FileCheck2 },
  { code: '62443', title: 'ISO/IEC 62443', copy: 'Industrial automation zones, conduits, security levels, lifecycle responsibilities, and defensible design evidence.', icon: Factory },
];

function Wordmark() {
  return (
    <a href="#top" className="group flex items-center gap-3 focus-ring" data-testid="link-home">
      <span className="relative flex h-10 w-10 items-center justify-center border border-[#61d3c8] bg-[#173744] text-[#f2a65a]">
        <svg viewBox="0 0 40 40" className="h-8 w-8" aria-label="Cyber Njord compass shield mark">
          <path d="M20 4 32 9v9c0 8-4.7 14-12 18C12.7 32 8 26 8 18V9l12-5Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="m20 9 3 9-3 13-3-13 3-9Zm0 9h9" fill="none" stroke="#61d3c8" strokeWidth="1.5" />
          <circle cx="20" cy="18" r="2.2" fill="#f2a65a" />
        </svg>
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-[#f2a65a]" />
      </span>
      <span className="font-display text-[1.05rem] font-bold tracking-[-.04em] text-[#f6f0df]">
        CYBER <span className="text-[#f2a65a]">NJORD</span>
      </span>
    </a>
  );
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      data-testid={`link-cta-${href.replace('#', '') || 'home'}`}
      className={`focus-ring group inline-flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-[.13em] transition-transform hover:-translate-y-0.5 ${
        secondary ? 'border border-[#47717b] text-[#f6f0df] hover:border-[#f2a65a] hover:text-[#f2a65a]' : 'bg-[#f2a65a] text-[#142d3b] hover:bg-[#ffc47d]'
      }`}
    >
      {children}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`eyebrow ${dark ? 'text-[#61d3c8]' : 'text-[#1b7778]'}`}>{children}</p>;
}

function TopologyPanel() {
  const [scenario, setScenario] = useState<keyof typeof topologyScenarios>('overview');
  const [selected, setSelected] = useState('dmz');
  const view = topologyScenarios[scenario];
  const selectedNode = topologyNodes.find((node) => node.id === selected) ?? topologyNodes[1];
  return (
    <div className="topology-surface relative overflow-hidden border border-[#47717b] p-5 text-[#f6f0df] md:p-8">
      <div className="blueprint-grid absolute inset-0 opacity-60" />
      <div className="relative">
        <div className="flex flex-col justify-between gap-5 border-b border-[#47717b] pb-5 sm:flex-row sm:items-start">
          <div>
            <SectionLabel dark>Live model / topology view</SectionLabel>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-[-.05em]">Trace the boundary, not just the box.</h3>
          </div>
          <label className="relative block min-w-[190px]">
            <span className="sr-only">Choose topology scenario</span>
            <select value={scenario} onChange={(event) => setScenario(event.target.value as keyof typeof topologyScenarios)} className="focus-ring w-full appearance-none border border-[#47717b] bg-[#142d3b] px-3 py-2.5 pr-9 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#f6f0df]" data-testid="select-topology-scenario">
              {Object.entries(topologyScenarios).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#61d3c8]" />
          </label>
        </div>
        <div className="relative mt-6 h-[420px] overflow-hidden border border-[#47717b]/70 bg-[#102c38]/70 sm:h-[390px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M18 30 C27 31, 29 45, 43 48 S55 30, 70 29" fill="none" stroke={view.active.includes('dmz') ? '#f2a65a' : '#47717b'} strokeWidth="0.45" strokeDasharray="2 1" />
            <path d="M47 52 C55 62, 62 70, 78 72" fill="none" stroke={(view.active as readonly string[]).includes('safety') ? '#b4d36b' : '#47717b'} strokeWidth="0.45" strokeDasharray="2 1" />
            <path d="M46 74 C43 64, 42 57, 43 49" fill="none" stroke={(view.active as readonly string[]).includes('cloud') ? '#b29cf4' : '#47717b'} strokeWidth="0.45" strokeDasharray="2 1" />
            <path d="M70 29 C75 38, 79 54, 80 68" fill="none" stroke={view.active.includes('ot') ? '#61d3c8' : '#47717b'} strokeWidth="0.45" strokeDasharray="2 1" />
          </svg>
          <div className="absolute left-3 top-3 font-mono-cnj text-[9px] uppercase tracking-[.14em] text-[#72979e]">context / {view.note}</div>
          {topologyNodes.map((node) => {
            const active = view.active.includes(node.id as never);
            const isSelected = selected === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelected(node.id)}
                className={`focus-ring asset-node absolute w-[135px] -translate-x-1/2 -translate-y-1/2 border p-3 text-left sm:w-[165px] ${isSelected ? 'border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]' : active ? 'border-[#61d3c8] bg-[#173744]/95 text-[#f6f0df]' : 'border-[#47717b] bg-[#142d3b]/80 text-[#72979e]'}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                data-testid={`button-topology-${node.id}`}
              >
                <span className={`mb-2 block h-1.5 w-1.5 rounded-full ${node.tone === 'orange' ? 'bg-[#f2a65a]' : node.tone === 'lime' ? 'bg-[#b4d36b]' : node.tone === 'violet' ? 'bg-[#b29cf4]' : 'bg-[#61d3c8]'}`} />
                <span className="block font-display text-sm font-semibold tracking-[-.03em]">{node.label}</span>
                <span className={`mt-1 block font-mono-cnj text-[9px] uppercase tracking-[.08em] ${isSelected ? 'text-[#5f4640]' : 'text-[#9eb6ba]'}`}>{node.sub}</span>
              </button>
            );
          })}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#9eb6ba]">
            <span className="border border-[#47717b] px-2 py-1">→ trust path</span>
            <span className="border border-[#f2a65a]/60 px-2 py-1 text-[#f2a65a]">! risk cue</span>
            <span className="border border-[#b4d36b]/60 px-2 py-1 text-[#b4d36b]">◆ safety dependency</span>
          </div>
        </div>
        <div className="mt-5 grid gap-5 border-t border-[#47717b] pt-5 md:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-[#f2a65a]">Selected zone</p>
            <p className="mt-2 font-display text-xl tracking-[-.04em]">{selectedNode.label}</p>
            <p className="mt-2 font-mono-cnj text-[10px] uppercase tracking-[.08em] text-[#9eb6ba]">{selectedNode.sub}</p>
          </div>
          <p className="text-sm leading-7 text-[#c8d7d8]">{view.copy}</p>
        </div>
      </div>
    </div>
  );
}

function AttackGraph() {
  const [selected, setSelected] = useState('jump');
  const detail = attackDetails[selected];
  const connected = attackEdges.filter(([from, to]) => from === selected || to === selected);
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
      <div className="relative min-h-[450px] overflow-hidden border border-[#47717b] bg-[#173744] p-5 md:p-8">
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="relative flex items-start justify-between">
          <div><SectionLabel dark>Assessment canvas / 04</SectionLabel><h3 className="mt-2 font-display text-2xl tracking-[-.05em] text-[#f6f0df]">Select a node. Follow the consequence.</h3></div>
          <Crosshair className="h-6 w-6 text-[#f2a65a]" />
        </div>
        <div className="relative mt-8 h-[320px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {attackEdges.map(([from, to]) => {
              const start = attackNodes.find((node) => node.id === from);
              const end = attackNodes.find((node) => node.id === to);
              if (!start || !end) return null;
              const hot = from === selected || to === selected || (selected === 'jump' && ['identity', 'vendor', 'hmi', 'plc'].includes(from === 'jump' ? to : from));
              return <line key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={hot ? '#f2a65a' : '#47717b'} strokeWidth={hot ? '0.8' : '0.35'} strokeDasharray={hot ? '0' : '2 1'} />;
            })}
          </svg>
          {attackNodes.map((node) => {
            const active = selected === node.id;
            return (
              <button key={node.id} onClick={() => setSelected(node.id)} className={`focus-ring asset-node absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-2 text-left ${active ? 'border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]' : 'border-[#61d3c8]/70 bg-[#142d3b] text-[#f6f0df]'}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} data-testid={`button-attack-node-${node.id}`}>
                <span className="block font-display text-xs font-semibold">{node.label}</span>
                <span className={`block font-mono-cnj text-[8px] uppercase tracking-[.08em] ${active ? 'text-[#5f4640]' : 'text-[#9eb6ba]'}`}>{node.sub}</span>
              </button>
            );
          })}
        </div>
        <div className="relative flex items-center justify-between border-t border-[#47717b] pt-4 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#72979e]"><span><span className="text-[#f2a65a]">{connected.length}</span> adjacent paths</span><span>illustrative assessment view</span></div>
      </div>
      <div className="border border-[#c5d6d1] bg-[#e7f0ed] p-6 md:p-8">
        <div className="flex items-center justify-between"><span className="eyebrow text-[#1b7778]">{detail.cue}</span><span className="font-mono-cnj text-[10px] text-[#819897]">NODE / {selected.toUpperCase()}</span></div>
        <h3 className="mt-6 font-display text-3xl font-medium leading-[.98] tracking-[-.06em] text-[#142d3b]">{attackNodes.find((node) => node.id === selected)?.label}</h3>
        <div className="mt-9 border-t border-[#b5ccc6] pt-5"><p className="eyebrow text-[#61777a]">Why it matters</p><p className="mt-3 text-sm leading-7 text-[#50676b]">{detail.why}</p></div>
        <div className="mt-7 border-t border-[#b5ccc6] pt-5"><p className="eyebrow text-[#1b7778]">Defensive move</p><p className="mt-3 text-sm leading-7 text-[#142d3b]">{detail.move}</p></div>
      </div>
    </div>
  );
}

function LayeredArchitecture() {
  const [selectedLayerId, setSelectedLayerId] = useState('boundary');
  const selectedLayer = architectureLayers.find((layer) => layer.id === selectedLayerId) ?? architectureLayers[2];
  const [selectedComponentId, setSelectedComponentId] = useState<string>(selectedLayer.components[0].id);
  const selectedComponent = selectedLayer.components.find((component) => component.id === selectedComponentId) ?? selectedLayer.components[0];
  const mappedAssetId = 'assetId' in selectedComponent ? selectedComponent.assetId : undefined;
  const mappedAsset = mappedAssetId ? systemAssets.find((asset) => asset.id === mappedAssetId) : undefined;
  const riskBand = (value: number) => value >= 80 ? 'Critical' : value >= 65 ? 'High' : value >= 45 ? 'Moderate' : 'Guarded';

  const chooseLayer = (layerId: string) => {
    const layer = architectureLayers.find((item) => item.id === layerId) ?? architectureLayers[0];
    setSelectedLayerId(layer.id);
    setSelectedComponentId(layer.components[0].id);
  };

  return (
    <div className="mt-7 border border-[#47717b] bg-[#142d3b] p-5 text-[#f6f0df] md:p-8" data-testid="layered-architecture">
      <div className="flex flex-col justify-between gap-5 border-b border-[#47717b] pb-6 sm:flex-row sm:items-end">
        <div>
          <SectionLabel dark>Architecture assembly / layers</SectionLabel>
          <h3 className="mt-2 font-display text-3xl tracking-[-.06em]">Open the system one layer at a time.</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9eb6ba]">Click a layer to expose its components. Then select a component to see its role and its mapped risk context in the wider system.</p>
        </div>
        <div className="flex items-center gap-2 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#b4d36b]"><span className="h-1.5 w-1.5 rounded-full bg-[#b4d36b]" />Interactive assembly</div>
      </div>
      <div className="mt-7 grid gap-7 lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-2" role="tablist" aria-label="System architecture layers">
          {architectureLayers.map((layer, index) => {
            const active = selectedLayer.id === layer.id;
            const toneColor = layer.tone === 'orange' ? '#f2a65a' : layer.tone === 'lime' ? '#b4d36b' : layer.tone === 'violet' ? '#b29cf4' : '#61d3c8';
            return (
              <button
                key={layer.id}
                onClick={() => chooseLayer(layer.id)}
                className={`focus-ring flex w-full items-center gap-4 border p-4 text-left transition-colors ${active ? 'border-[#f2a65a] bg-[#173744]' : 'border-[#47717b] bg-[#102c38] hover:border-[#61d3c8]'}`}
                role="tab"
                aria-selected={active}
                data-testid={`button-architecture-layer-${layer.id}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border font-mono-cnj text-[9px]" style={{ borderColor: toneColor, color: toneColor }}>{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1"><span className="block font-mono-cnj text-[9px] uppercase tracking-[.12em]" style={{ color: toneColor }}>{layer.number}</span><span className="mt-1 block font-display text-base font-semibold">{layer.label}</span></span>
                <span className="font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#72979e]">{layer.components.length} parts</span>
              </button>
            );
          })}
        </div>
        <div className="border border-[#47717b] bg-[#173744] p-5 md:p-6" role="tabpanel">
          <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-[#f2a65a]">{selectedLayer.number}</p><h4 className="mt-2 font-display text-2xl tracking-[-.05em]">{selectedLayer.label}</h4></div><Layers3 className="h-6 w-6 text-[#61d3c8]" /></div>
          <p className="mt-4 text-sm leading-7 text-[#c8d7d8]">{selectedLayer.description}</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">{selectedLayer.components.map((component) => <button key={component.id} onClick={() => setSelectedComponentId(component.id)} className={`focus-ring border p-3 text-left transition-colors ${selectedComponent.id === component.id ? 'border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]' : 'border-[#47717b] bg-[#142d3b] hover:border-[#61d3c8]'}`} data-testid={`button-architecture-component-${component.id}`}><span className="block font-display text-sm font-semibold">{component.label}</span><span className={`mt-1 block text-xs leading-5 ${selectedComponent.id === component.id ? 'text-[#5f4640]' : 'text-[#9eb6ba]'}`}>{component.detail}</span></button>)}</div>
          <div className="mt-6 border-t border-[#47717b] pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow text-[#61d3c8]">Selected component</p><p className="mt-2 font-display text-xl">{selectedComponent.label}</p></div>{mappedAsset ? <div className="text-right"><p className="eyebrow text-[#9eb6ba]">Mapped risk prompt</p><p className="mt-2 font-display text-2xl text-[#f2a65a]">{mappedAsset.score}<small className="ml-1 font-mono-cnj text-[9px] text-[#9eb6ba]">/100 · {riskBand(mappedAsset.score)}</small></p></div> : <span className="font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#72979e]">No direct asset score</span>}</div>
            <p className="mt-4 text-xs leading-6 text-[#9eb6ba]">{mappedAsset ? `${mappedAsset.detail}. Use the system model below to test this component against different attack scenarios and risk lenses.` : 'This is an architectural context component. Confirm its owner, dependency, trust assumptions, and evidence before assigning a risk score.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecoveryRunbook() {
  const [selectedPhaseId, setSelectedPhaseId] = useState('contain');
  const [scenario, setScenario] = useState<keyof typeof recoveryScenarios>('industrial');
  const selectedPhase = recoveryPhases.find((phase) => phase.id === selectedPhaseId) ?? recoveryPhases[1];
  const scenarioContext = recoveryScenarios[scenario];

  return (
    <section id="recovery" className="bg-[#f2f0e8] px-6 py-24 lg:px-10 lg:py-32" data-testid="section-disaster-recovery">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[.42fr_1fr] lg:items-start">
          <div>
            <SectionLabel>05 / Disaster recovery</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[.92] tracking-[-.07em] text-[#142d3b]">Recover with<br /><span className="text-[#1b7778]">proof.</span></h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-[#61777a]">A recovery plan is only useful when it explains who decides, what comes back first, how safety is checked, and what evidence supports the return to operation.</p>
            <label className="relative mt-8 block max-w-sm"><span className="eyebrow text-[#61777a]">Apply the runbook to</span><select value={scenario} onChange={(event) => setScenario(event.target.value as keyof typeof recoveryScenarios)} className="focus-ring mt-3 w-full appearance-none border border-[#b9ceca] bg-[#f8f7f1] px-3 py-3 pr-9 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#142d3b]" data-testid="select-recovery-scenario"><option value="finance">Financial institution</option><option value="industrial">OT / IT / ICS operator</option><option value="education">University / school / academy</option></select><ChevronDown className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 text-[#1b7778]" /></label>
          </div>
          <div className="border border-[#c5d6d1] bg-[#e7f0ed] p-5 md:p-8">
            <div className="flex flex-col justify-between gap-5 border-b border-[#b5ccc6] pb-6 sm:flex-row sm:items-start"><div><p className="eyebrow text-[#f08b3d]">Recovery context / {scenarioContext.label}</p><h3 className="mt-3 font-display text-2xl tracking-[-.05em] text-[#142d3b]">From disruption to a defensible restart.</h3></div><RefreshCw className="h-7 w-7 text-[#1b7778]" /></div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#50676b]">{scenarioContext.context}</p>
            <div className="mt-7 grid gap-2 sm:grid-cols-5">{recoveryPhases.map((phase) => { const active = phase.id === selectedPhase.id; const toneColor = phase.tone === 'orange' ? '#f2a65a' : phase.tone === 'lime' ? '#7a9b39' : phase.tone === 'violet' ? '#7862ba' : '#1b7778'; return <button key={phase.id} onClick={() => setSelectedPhaseId(phase.id)} className={`focus-ring border p-3 text-left transition-colors ${active ? 'border-[#142d3b] bg-[#142d3b] text-[#f6f0df]' : 'border-[#b5ccc6] bg-[#f2f0e8] text-[#142d3b] hover:border-[#1b7778]'}`} data-testid={`button-recovery-phase-${phase.id}`}><span className="block font-mono-cnj text-[10px]" style={{ color: active ? '#f2a65a' : toneColor }}>{phase.number}</span><span className="mt-2 block font-display text-sm font-semibold leading-tight">{phase.label}</span></button>; })}</div>
            <div className="mt-7 grid gap-7 border-t border-[#b5ccc6] pt-6 md:grid-cols-[1fr_.72fr]"><div><p className="eyebrow text-[#1b7778]">Selected phase</p><h4 className="mt-3 font-display text-2xl leading-[.98] tracking-[-.05em] text-[#142d3b]">{selectedPhase.title}</h4><p className="mt-4 text-sm leading-7 text-[#50676b]">{selectedPhase.copy}</p></div><div><p className="eyebrow text-[#61777a]">Evidence to leave behind</p><div className="mt-3 space-y-2">{selectedPhase.evidence.map((item) => <div key={item} className="flex items-center gap-2 border-b border-[#c5d6d1] pb-2 text-sm text-[#142d3b]"><Check className="h-4 w-4 text-[#1b7778]" />{item}</div>)}</div></div></div>
          </div>
        </div>
        <div className="mt-12 grid gap-7 lg:grid-cols-[.45fr_1fr] lg:items-center">
          <div><SectionLabel>Recovery explainer / 16:9</SectionLabel><h3 className="mt-4 font-display text-3xl leading-[.98] tracking-[-.06em] text-[#142d3b]">See the recovery sequence in motion.</h3><p className="mt-4 text-sm leading-7 text-[#61777a]">Disruption, containment, verified restore, validation, and a controlled return to operation.</p></div>
          <div className="overflow-hidden border border-[#47717b] bg-[#142d3b] shadow-md"><iframe title="Cyber Njord disaster recovery explainer" src={`${import.meta.env.BASE_URL}cyber-njord-recovery-video/`} className="aspect-video w-full" allow="autoplay" loading="lazy" data-testid="iframe-recovery-explainer" /></div>
        </div>
      </div>
    </section>
  );
}

function ProductsShelf({ onSelectProduct }: { onSelectProduct: (productName: string) => void }) {
  return (
    <section id="products" className="bg-[#142d3b] px-6 py-24 text-[#f6f0df] lg:px-10 lg:py-32" data-testid="section-example-products">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><SectionLabel dark>Client-ready products / examples</SectionLabel><h2 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[.92] tracking-[-.07em]">Useful tools your<br /><span className="text-[#61d3c8]">team can put to work.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#9eb6ba]">Configured with your people and evidence, these are practical models, kits, and decision aids—not claims of off-the-shelf software.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {exampleProducts.map((product) => {
            const Icon = product.icon;
            const orange = product.accent === 'orange';
            return (
              <article key={product.id} className={`border p-6 md:p-8 ${orange ? 'border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]' : 'border-[#47717b] bg-[#173744]'}`} data-testid={`card-product-${product.id}`}>
                <div className="flex items-start justify-between gap-4"><div><p className={`eyebrow ${orange ? 'text-[#5f4640]' : 'text-[#61d3c8]'}`}>{product.label}</p><h3 className="mt-4 font-display text-2xl font-semibold tracking-[-.04em]">{product.name}</h3></div><Icon className={`h-7 w-7 shrink-0 stroke-[1.25] ${orange ? 'text-[#142d3b]' : 'text-[#f2a65a]'}`} /></div>
                <p className={`mt-4 text-sm leading-7 ${orange ? 'text-[#5f4640]' : 'text-[#c8d7d8]'}`}>{product.copy}</p>
                <div className={`mt-6 border-t pt-5 ${orange ? 'border-[#142d3b]/20' : 'border-[#47717b]'}`}>{product.includes.map((item) => <div key={item} className={`mb-2 flex items-center gap-2 text-sm ${orange ? 'text-[#142d3b]' : 'text-[#c8d7d8]'}`}><Check className={`h-4 w-4 ${orange ? 'text-[#1b7778]' : 'text-[#61d3c8]'}`} />{item}</div>)}</div>
                <button type="button" onClick={() => onSelectProduct(product.name)} className={`focus-ring mt-5 inline-flex items-center gap-2 border-b pb-1 font-mono-cnj text-[10px] uppercase tracking-[.1em] ${orange ? 'border-[#142d3b] text-[#142d3b]' : 'border-[#61d3c8] text-[#61d3c8]'}`} data-testid={`button-product-interest-${product.id}`}>Discuss this product <ArrowUpRight className="h-3.5 w-3.5" /></button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SystemModel() {
  const [selected, setSelected] = useState('controller');
  const [lens, setLens] = useState('consequence');
  const [scenario, setScenario] = useState<keyof typeof attackScenarios>('vendor');
  const attack = attackScenarios[scenario];
  const asset = systemAssets.find((item) => item.id === selected);
  const lensLabel = lens === 'consequence' ? 'Consequence' : lens === 'reachability' ? 'Reachability' : 'Recovery confidence';
  const scoreFor = (item: typeof systemAssets[number]) => {
    const base = attack.scores[item.id as keyof typeof attack.scores] ?? item.score;
    if (lens === 'reachability') return Math.max(18, base - (item.zone === 'Physical' ? 8 : 4));
    if (lens === 'recovery') return Math.max(14, base - (item.id === 'recovery' ? 22 : 13));
    return base;
  };
  const scores = systemAssets.map(scoreFor);
  const systemScore = Math.round(scores.reduce((total, value) => total + value, 0) / scores.length);
  const selectedScore = asset ? scoreFor(asset) : systemScore;
  const riskBand = (value: number) => value >= 80 ? 'Critical' : value >= 65 ? 'High' : value >= 45 ? 'Moderate' : 'Guarded';
  const activeRoute = attack.route as readonly string[];
  return (
    <div className="border border-[#47717b] bg-[#142d3b] p-5 text-[#f6f0df] md:p-8">
      <div className="flex flex-col justify-between gap-5 border-b border-[#47717b] pb-6 sm:flex-row sm:items-end">
        <div><SectionLabel dark>System model / 05</SectionLabel><h3 className="mt-2 font-display text-3xl tracking-[-.06em]">A cyber-physical system you can interrogate.</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#9eb6ba]">Choose an attack scenario, click any component, and compare its exposure with the risk carried by the system as a whole. Scores are illustrative prompts for evidence and decisions.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="relative block min-w-[190px]"><span className="eyebrow text-[#61d3c8]">Attack scenario</span><select value={scenario} onChange={(event) => setScenario(event.target.value as keyof typeof attackScenarios)} className="focus-ring mt-2 w-full appearance-none border border-[#47717b] bg-[#173744] px-3 py-2.5 pr-9 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#f6f0df]" data-testid="select-attack-scenario"><option value="vendor">Vendor remote access</option><option value="ransomware">Ransomware spillover</option><option value="unsafeCommand">Unsafe control command</option></select><ChevronDown className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 text-[#61d3c8]" /></label>
          <label className="relative block min-w-[190px]"><span className="eyebrow text-[#61d3c8]">Risk lens</span><select value={lens} onChange={(event) => setLens(event.target.value)} className="focus-ring mt-2 w-full appearance-none border border-[#47717b] bg-[#173744] px-3 py-2.5 pr-9 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#f6f0df]" data-testid="select-risk-lens"><option value="consequence">Consequence</option><option value="reachability">Reachability</option><option value="recovery">Recovery confidence</option></select><ChevronDown className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 text-[#61d3c8]" /></label>
        </div>
      </div>
      <div className="mt-5 grid gap-4 border-b border-[#47717b] pb-5 md:grid-cols-[1fr_auto] md:items-center">
        <div><p className="eyebrow text-[#f2a65a]">{attack.short} / {attack.label}</p><p className="mt-2 max-w-3xl text-sm leading-7 text-[#c8d7d8]">{attack.description}</p></div>
        <div className="flex items-center gap-4 border border-[#47717b] bg-[#173744] px-4 py-3"><span className="eyebrow text-[#9eb6ba]">System risk</span><span className="font-display text-3xl text-[#f2a65a]">{systemScore}<small className="ml-1 font-mono-cnj text-[10px] text-[#9eb6ba]">/100</small></span><span className="font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#b4d36b]">{riskBand(systemScore)}</span></div>
      </div>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
        <div className="model-shell relative min-h-[405px] overflow-hidden border border-[#47717b] bg-[#102c38] p-5">
          <div className="absolute left-5 top-5 font-mono-cnj text-[9px] uppercase tracking-[.13em] text-[#72979e]">model / layer 03 / assets {systemAssets.length} / route {activeRoute.length}</div>
          <div className="model-plane absolute left-[13%] top-[16%] h-[270px] w-[72%] border border-[#61d3c8]/40 bg-[#173744]/80">
            <div className="absolute inset-[13%] border border-[#47717b]"><span className="absolute -top-5 left-1 font-mono-cnj text-[8px] uppercase tracking-[.1em] text-[#72979e]">enterprise</span></div>
            <div className="absolute left-[48%] top-[12%] h-[75%] w-px bg-[#f2a65a]/40" />
            <div className="absolute bottom-[14%] left-[12%] right-[12%] h-px bg-[#b4d36b]/40" />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {systemEdges.map(([from, to]) => {
                const start = systemAssets.find((item) => item.id === from);
                const end = systemAssets.find((item) => item.id === to);
                if (!start || !end) return null;
                const hot = activeRoute.includes(from) && activeRoute.includes(to);
                return <line key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={hot ? '#f2a65a' : '#47717b'} strokeWidth={hot ? '0.85' : '0.35'} strokeDasharray={hot ? '0' : '2 1'} />;
              })}
            </svg>
            {systemAssets.map((item) => {
              const isSelected = item.id === selected;
              const onRoute = activeRoute.includes(item.id);
              const displayScore = scoreFor(item);
              return <button key={item.id} onClick={() => setSelected(item.id)} data-selected={isSelected} data-attack-active={onRoute} data-testid={`button-model-asset-${item.id}`} className={`focus-ring asset-node absolute -translate-x-1/2 -translate-y-1/2 border px-2 py-1.5 text-left ${isSelected ? 'z-10 border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]' : onRoute ? 'border-[#f2a65a]/80 bg-[#142d3b] text-[#f6f0df]' : 'border-[#61d3c8]/70 bg-[#142d3b] text-[#f6f0df]'}`} style={{ left: `${item.x}%`, top: `${item.y}%` }}><span className="block whitespace-nowrap font-display text-[10px] font-semibold">{item.label}</span><span className={`block font-mono-cnj text-[8px] ${isSelected ? 'text-[#5f4640]' : onRoute ? 'text-[#f2a65a]' : 'text-[#9eb6ba]'}`}>{displayScore} / 100</span></button>;
            })}
          </div>
          <div className="absolute bottom-4 left-5 flex flex-wrap gap-4 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#9eb6ba]"><span><i className="mr-1 inline-block h-2 w-2 bg-[#f2a65a]" />selected / route</span><span><i className="mr-1 inline-block h-2 w-2 bg-[#61d3c8]" />connected asset</span><span><i className="mr-1 inline-block h-2 w-2 bg-[#b4d36b]" />recovery</span></div>
        </div>
        <div className="border border-[#47717b] bg-[#173744] p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-[#f2a65a]">{asset ? asset.zone : 'System overview'}</p><h4 className="mt-3 font-display text-2xl tracking-[-.05em]">{asset ? asset.label : 'Full system risk'}</h4></div><div className="flex items-center gap-2"><Boxes className="h-7 w-7 text-[#61d3c8]" /><button onClick={() => setSelected('system')} className={`focus-ring border px-2 py-1 font-mono-cnj text-[9px] uppercase tracking-[.08em] ${selected === 'system' ? 'border-[#f2a65a] text-[#f2a65a]' : 'border-[#47717b] text-[#9eb6ba]'}`} data-testid="button-model-system-overview">System</button></div></div>
          <p className="mt-2 text-sm text-[#9eb6ba]">{asset ? asset.detail : 'Average exposure across physical, control, recovery, and boundary dependencies.'}</p>
          <div className="mt-8 border-t border-[#47717b] pt-5"><div className="flex items-end justify-between"><span className="eyebrow text-[#9eb6ba]">{lensLabel} / {riskBand(selectedScore)}</span><span className="font-display text-4xl text-[#f2a65a]">{selectedScore}<small className="ml-1 font-mono-cnj text-[10px] text-[#9eb6ba]">/100</small></span></div><div className="mt-3 h-1.5 bg-[#102c38]"><div className="h-full bg-[#f2a65a] transition-all" style={{ width: `${selectedScore}%` }} /></div></div>
          <div className="mt-6 border-t border-[#47717b] pt-5"><p className="eyebrow text-[#9eb6ba]">{asset ? 'Why this component matters' : 'System-wide reading'}</p><p className="mt-3 text-sm leading-7 text-[#c8d7d8]">{asset ? attack.impact[asset.id as keyof typeof attack.impact] : attack.description}</p></div>
          <div className="mt-6 border-t border-[#47717b] pt-5"><p className="eyebrow text-[#1b7778]">Defensive move</p><p className="mt-3 text-sm leading-7 text-[#f6f0df]">{attack.move}</p></div>
          <div className="mt-6 flex items-center gap-2 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#b4d36b]"><span className="status-pip h-2 w-2 rounded-full bg-[#b4d36b]" />Assessment status / evidence needed</div>
        </div>
      </div>
    </div>
  );
}

function MappingConsole() {
  const [mappingType, setMappingType] = useState<keyof typeof mappingLinks>('Vulnerability');
  const [mappingAsset, setMappingAsset] = useState('Edge gateway');
  const mappingTabs: Array<{ label: keyof typeof mappingLinks; icon: typeof ShieldAlert }> = [
    { label: 'Vulnerability', icon: ShieldAlert },
    { label: 'Control', icon: SlidersHorizontal },
    { label: 'Framework', icon: Layers3 },
    { label: 'Attack technique', icon: GitBranch },
  ];
  return (
    <div className="mt-10 border border-[#47717b] bg-[#173744] p-5 text-[#f6f0df] md:p-8" data-testid="mapping-console">
      <div className="flex flex-col justify-between gap-5 border-b border-[#47717b] pb-5 md:flex-row md:items-end">
        <div><SectionLabel dark>Online mapping / connected evidence</SectionLabel><h3 className="mt-2 font-display text-2xl tracking-[-.05em]">One asset. Four useful views.</h3></div>
        <div className="flex items-center gap-2 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#b4d36b]"><span className="h-1.5 w-1.5 rounded-full bg-[#b4d36b]" />Connect your feeds</div>
      </div>
      <div className="grid gap-7 pt-6 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-[#9eb6ba]">Choose an asset</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{systemAssets.map((item) => <button key={item.id} onClick={() => setMappingAsset(item.label)} className={`focus-ring flex items-center justify-between border px-3 py-3 text-left text-sm transition-colors ${mappingAsset === item.label ? 'border-[#f2a65a] bg-[#f2a65a] text-[#142d3b]' : 'border-[#47717b] text-[#c8d7d8] hover:border-[#61d3c8]'}`} data-testid={`button-mapping-asset-${item.id}`}><span>{item.label}</span><span className={`font-mono-cnj text-[9px] uppercase ${mappingAsset === item.label ? 'text-[#5f4640]' : 'text-[#72979e]'}`}>{item.zone}</span></button>)}</div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Mapping views">{mappingTabs.map(({ label, icon: Icon }) => <button key={label} onClick={() => setMappingType(label)} className={`focus-ring inline-flex items-center gap-2 border px-3 py-2 font-mono-cnj text-[9px] uppercase tracking-[.08em] ${mappingType === label ? 'border-[#61d3c8] bg-[#61d3c8] text-[#142d3b]' : 'border-[#47717b] text-[#9eb6ba] hover:border-[#61d3c8]'}`} data-testid={`button-mapping-type-${label.toLowerCase().replaceAll(' ', '-')}`}><Icon className="h-3.5 w-3.5" />{label}</button>)}</div>
          <div className="mt-4 border border-[#47717b] bg-[#142d3b] p-5">
            <div className="flex items-start justify-between"><div><p className="eyebrow text-[#f2a65a]">{mappingAsset}</p><p className="mt-2 text-sm text-[#9eb6ba]">Mapped {mappingType.toLowerCase()} references</p></div><GitBranch className="h-5 w-5 text-[#61d3c8]" /></div>
            <div className="mt-5 divide-y divide-[#47717b]">{mappingLinks[mappingType].map(([title, copy]) => <div key={title} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="font-display text-sm text-[#f6f0df]">{title}</p><p className="mt-1 text-xs text-[#9eb6ba]">{copy}</p></div><ArrowUpRight className="h-4 w-4 shrink-0 text-[#f2a65a]" /></div>)}</div>
            <p className="mt-5 border-t border-[#47717b] pt-4 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#72979e]">Illustrative relationship map · evidence owner confirms applicability</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [productInterest, setProductInterest] = useState('');
  const [serviceFilter, setServiceFilter] = useState<'All' | ServiceCategory>('All');
  const [vulnerabilitySeverity, setVulnerabilitySeverity] = useState('All');
  const [vulnerabilityStatus, setVulnerabilityStatus] = useState('All');

  const filteredServices = useMemo(() => serviceFilter === 'All' ? services : services.filter((service) => service.category === serviceFilter), [serviceFilter]);
  const filteredVulnerabilities = useMemo(() => vulnerabilityRecords.filter((record) => (vulnerabilitySeverity === 'All' || record.severity === vulnerabilitySeverity) && (vulnerabilityStatus === 'All' || record.status === vulnerabilityStatus)), [vulnerabilitySeverity, vulnerabilityStatus]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const brief = String(data.get('brief') || '');
    const selectedProduct = String(data.get('productInterest') || '');
    window.location.href = `mailto:hello@cybernjord.eu?subject=${encodeURIComponent(`Conversation request from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}${selectedProduct ? `\nProduct interest: ${selectedProduct}` : ''}\n\n${brief}`)}`;
    setSent(true);
    form.reset();
    setProductInterest('');
  };

  const handleProductSelect = (productName: string) => {
    setProductInterest(productName);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeMenu = () => setMenuOpen(false);
  const navItems = [['Sectors', '#sectors'], ['Capabilities', '#capabilities'], ['Products', '#products'], ['System models', '#models'], ['Recovery', '#recovery'], ['Learning', '#learning'], ['Our team', '#team']];

  return (
    <div className="cnj-page grain" id="top">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-10">
          <Wordmark />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="nav-link focus-ring text-xs font-bold uppercase tracking-[.14em] text-[#b9cbd0] hover:text-[#f6f0df]" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
            <a href="#contact" className="focus-ring border border-[#47717b] px-4 py-2.5 text-xs font-bold uppercase tracking-[.15em] text-[#f6f0df] transition-colors hover:border-[#f2a65a] hover:text-[#f2a65a]" data-testid="link-nav-contact">Start a conversation</a>
          </nav>
          <button className="focus-ring border border-[#47717b] p-2 text-[#f6f0df] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        <AnimatePresence>{menuOpen && <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-4 border border-[#47717b] bg-[#173744] p-5 md:hidden" aria-label="Mobile navigation"><div className="flex flex-col gap-5">{[...navItems, ['Start a conversation', '#contact']].map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="focus-ring text-xs font-bold uppercase tracking-[.15em] text-[#f6f0df]" data-testid={`link-mobile-${href.slice(1)}`}>{label}</a>)}</div></motion.nav>}</AnimatePresence>
      </header>

      <main>
        <section className="hero-angle relative min-h-[780px] overflow-hidden bg-[#142d3b] text-[#f6f0df]">
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute -right-40 top-32 h-[530px] w-[530px] rounded-full border border-[#61d3c8]/20 lg:right-[-5rem]" /><div className="absolute -right-24 top-48 h-[300px] w-[300px] rounded-full border border-[#61d3c8]/10" />
          <div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 pb-28 pt-40 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:px-10 lg:pt-48">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="max-w-3xl">
              <div className="mb-8 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#61d3c8]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#f2a65a]" />Independent cybersecurity practice · Europe</div>
              <h1 className="font-display text-[clamp(3.5rem,8vw,7.7rem)] font-medium leading-[.88] tracking-[-.075em]">Protect what<br /><span className="text-[#61d3c8]">keeps moving.</span></h1>
              <p className="mt-9 max-w-xl text-lg leading-8 text-[#c8d7d8] sm:text-xl">Cybersecurity and system modelling for financial institutions, OT / IT / ICS operators, universities, schools, academies, and the critical infrastructure around them.</p>
              <div className="mt-10 flex flex-wrap gap-4"><ButtonLink href="#contact">Talk through your risk</ButtonLink><ButtonLink href="#capabilities" secondary>Explore the platform</ButtonLink></div>
              <div className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-[#47717b] pt-5 font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#9eb6ba]"><span><b className="block font-normal text-[#f2a65a]">01</b> context first</span><span><b className="block font-normal text-[#f2a65a]">02</b> evidence mapped</span><span><b className="block font-normal text-[#f2a65a]">03</b> decisions clear</span></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }} className="relative flex min-h-[365px] items-center justify-center lg:mt-8">
              <div className="signal-ring flex h-[315px] w-[315px] items-center justify-center sm:h-[385px] sm:w-[385px]"><div className="signal-ring flex h-[220px] w-[220px] items-center justify-center sm:h-[272px] sm:w-[272px]"><div className="signal-ring flex h-[120px] w-[120px] items-center justify-center sm:h-[150px] sm:w-[150px]"><div className="h-3 w-3 rounded-full bg-[#f2a65a] shadow-[0_0_0_10px_rgba(242,166,90,.13)]" /></div><span className="absolute -top-1 left-[43%] bg-[#142d3b] px-2 font-mono-cnj text-[9px] tracking-[.16em] text-[#61d3c8]">SYSTEM / 01</span><span className="absolute -bottom-1 right-[14%] bg-[#142d3b] px-2 font-mono-cnj text-[9px] tracking-[.16em] text-[#9eb6ba]">CONTEXT</span></div></div>
              <div className="absolute bottom-0 left-0 border-l-2 border-[#f2a65a] bg-[#173744] px-4 py-3 font-mono-cnj text-[10px] uppercase leading-5 tracking-[.12em] text-[#c8d7d8]"><span className="text-[#f2a65a]">Signal detected</span><br />Operational reality in view</div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-6 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.18em] text-[#72979e] lg:left-10"><ArrowDownRight className="h-4 w-4 text-[#f2a65a]" /> Scroll to orient</div>
        </section>

        <section className="border-b border-[#cedbd9] bg-[#f2f0e8]">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 lg:grid-cols-[.4fr_1fr] lg:px-10 lg:py-28"><div><div className="line-accent mb-6" /><SectionLabel>The premise</SectionLabel></div><div><h2 className="font-display max-w-4xl text-[clamp(2.3rem,5vw,4.9rem)] font-medium leading-[.98] tracking-[-.065em] text-[#142d3b]">Security is only useful when it helps the operation <span className="text-[#1b7778]">stay in control.</span></h2><p className="mt-8 max-w-2xl text-base leading-8 text-[#50676b]">Cyber Njord is a consultancy, learning space, and reference-intelligence practice for financial institutions, industrial and critical operations, and education environments — using modelling to connect technical exposure with consequence.</p></div></div>
        </section>

         <section id="sectors" className="bg-[#e7f0ed] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>Sector focus / working models</SectionLabel><h2 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[.92] tracking-[-.07em] text-[#142d3b]">Start with the<br /><span className="text-[#1b7778]">system you run.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#50676b]">Different environments carry different consequences. The method stays evidence-led, but the model starts with how your organisation actually works.</p></div><div className="grid gap-4 md:grid-cols-2">{sectorModels.map((sector) => { const Icon = sector.icon; return <article key={sector.code} className={`border p-7 ${sector.accent === 'orange' ? 'border-[#f2a65a] bg-[#f2a65a]' : 'border-[#a8c8c2] bg-[#f2f0e8]'}`} data-testid={`card-sector-${sector.code.toLowerCase().replaceAll(' ', '-')}`}><div className="flex items-start justify-between"><span className={`font-mono-cnj text-[10px] uppercase tracking-[.15em] ${sector.accent === 'orange' ? 'text-[#5f4640]' : 'text-[#1b7778]'}`}>{sector.code}</span><Icon className={`h-7 w-7 stroke-[1.25] ${sector.accent === 'orange' ? 'text-[#142d3b]' : 'text-[#1b7778]'}`} /></div><h3 className="mt-14 font-display text-3xl leading-[.95] tracking-[-.06em] text-[#142d3b]">{sector.title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-[#50676b]">{sector.copy}</p><div className={`mt-7 border-t pt-5 ${sector.accent === 'orange' ? 'border-[#142d3b]/20' : 'border-[#c5d6d1]'}`}>{sector.outputs.map((output) => <div key={output} className="mb-2 flex items-center gap-2 font-mono-cnj text-[10px] uppercase tracking-[.08em] text-[#1b7778]"><Check className="h-3.5 w-3.5" />{output}</div>)}</div></article>; })}</div></div></section>

        <section id="capabilities" className="bg-[#f8f7f1] px-6 py-24 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[1400px]"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel>01 / Service catalogue</SectionLabel><h2 className="mt-5 font-display max-w-2xl text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[.95] tracking-[-.07em] text-[#142d3b]">Clear eyes.<br /><span className="text-[#1b7778]">Useful pressure.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#61777a]">Choose the mode of work that fits the decision in front of you. Every engagement leaves behind a usable artefact.</p></div>
            <div className="mb-7 flex flex-wrap gap-2 border-b border-[#cedbd9] pb-5">{(['All', 'Assess', 'Build', 'Operate', 'Prepare'] as const).map((filter) => <button key={filter} onClick={() => setServiceFilter(filter)} className={`focus-ring border px-4 py-2 font-mono-cnj text-[10px] uppercase tracking-[.12em] transition-colors ${serviceFilter === filter ? 'border-[#142d3b] bg-[#142d3b] text-[#f6f0df]' : 'border-[#b9ceca] text-[#61777a] hover:border-[#1b7778] hover:text-[#1b7778]'}`} data-testid={`button-service-filter-${filter.toLowerCase()}`}>{filter}</button>)}</div>
            <div className="grid gap-4 lg:grid-cols-3">{filteredServices.map((item, index) => { const Icon = item.icon; return <motion.article layout key={item.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={`service-card border border-[#cedbd9] p-7 ${index % 3 === 1 ? 'bg-[#e7f0ed]' : 'bg-[#f2f0e8]'}`} data-testid={`card-service-${item.id}`}><div className="mb-12 flex items-start justify-between"><Icon className="h-8 w-8 stroke-[1.25] text-[#1b7778]" /><span className="font-mono-cnj text-xs text-[#9aaead]">{item.number}</span></div><span className="font-mono-cnj text-[9px] uppercase tracking-[.14em] text-[#f08b3d]">{item.category}</span><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em] text-[#142d3b]">{item.title}</h3><p className="mt-4 min-h-[100px] text-sm leading-7 text-[#61777a]">{item.copy}</p><div className="mt-7 border-t border-[#cedbd9] pt-5">{item.outputs.map((output) => <div key={output} className="mb-2 flex items-center gap-2 font-mono-cnj text-[10px] uppercase tracking-[.08em] text-[#1b7778]"><Check className="h-3.5 w-3.5" />{output}</div>)}</div></motion.article>; })}</div>
          </div>
        </section>

        <section id="topology" className="bg-[#142d3b] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.42fr_1fr] lg:items-center"><div className="text-[#f6f0df]"><SectionLabel dark>02 / Infrastructure context</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.2rem)] font-medium leading-[.92] tracking-[-.07em]">See where<br /><span className="text-[#f2a65a]">trust crosses.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#9eb6ba]">Enterprise, DMZ, OT / ICS, safety, and cloud zones do not carry the same consequence. Explore the model to see how a small change in access can alter the whole picture.</p><a href="#models" className="focus-ring mt-8 inline-flex items-center gap-2 font-mono-cnj text-[10px] uppercase tracking-[.12em] text-[#61d3c8]">Open system model <ArrowDownRight className="h-4 w-4" /></a></div><TopologyPanel /></div></section>

        <section className="bg-[#f2f0e8] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="mb-12 flex items-end justify-between gap-5"><div><SectionLabel>03 / Engagement packets</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,4.8rem)] leading-[.95] tracking-[-.07em] text-[#142d3b]">A bounded start<br /><span className="text-[#1b7778]">with a clear finish.</span></h2></div><Boxes className="hidden h-12 w-12 text-[#f2a65a] sm:block" /></div><div className="grid gap-4 lg:grid-cols-3">{bundles.map((bundle) => <article key={bundle.code} className={`border p-7 ${bundle.accent === 'orange' ? 'border-[#f2a65a] bg-[#f2a65a]' : 'border-[#cedbd9] bg-[#f8f7f1]'}`} data-testid={`card-bundle-${bundle.code.toLowerCase().replaceAll(' ', '-')}`}><div className="flex items-center justify-between"><span className={`font-mono-cnj text-[10px] uppercase tracking-[.15em] ${bundle.accent === 'orange' ? 'text-[#5f4640]' : 'text-[#1b7778]'}`}>{bundle.code}</span><ArrowUpRight className={bundle.accent === 'orange' ? 'h-5 w-5 text-[#142d3b]' : 'h-5 w-5 text-[#f2a65a]'} /></div><h3 className="mt-16 font-display text-3xl leading-[.95] tracking-[-.06em] text-[#142d3b]">{bundle.title}</h3><p className="mt-5 text-sm leading-7 text-[#50676b]">{bundle.copy}</p><p className="mt-6 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#1b7778]">{bundle.use}</p><ul className="mt-6 border-t border-current/15 pt-5">{bundle.includes.map((include) => <li key={include} className="mb-2 flex items-center gap-2 text-sm text-[#50676b]"><Check className="h-4 w-4 text-[#1b7778]" />{include}</li>)}</ul></article>)}</div></div></section>

        <ProductsShelf onSelectProduct={handleProductSelect} />

        <section id="models" className="bg-[#173744] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="mb-12 grid gap-7 md:grid-cols-[.7fr_1fr] md:items-end"><div><SectionLabel dark>04 / Assessment instruments</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.92] tracking-[-.07em] text-[#f6f0df]">Make the path<br /><span className="text-[#61d3c8]">visible.</span></h2></div><p className="max-w-xl text-sm leading-7 text-[#9eb6ba]">Interactive models are not theatre. They are compact ways to ask better questions: which asset matters, which path is plausible, and which defensive move changes the outcome?</p></div><LayeredArchitecture /><div className="mt-7"><AttackGraph /></div><div className="mt-7"><SystemModel /></div></div></section>

        <RecoveryRunbook />

        <section id="learning" className="bg-[#dfece8] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[.42fr_1fr]"><div><SectionLabel>05 / Learning pathways</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.92] tracking-[-.07em] text-[#142d3b]">Build the<br /><span className="text-[#1b7778]">competence.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#50676b]">Short, applied learning for teams that need to understand the system behind the control. Preparation and evidence, not a promise of external certification.</p><div className="mt-9 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.15em] text-[#1b7778]"><GraduationCap className="h-4 w-4" /> learn / apply / evidence</div></div><div className="space-y-3"><article className="border border-[#a8c8c2] bg-[#f2f0e8] p-6 md:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><p className="eyebrow text-[#f08b3d]">Pathway / foundational</p><h3 className="mt-3 font-display text-2xl tracking-[-.05em] text-[#142d3b]">System thinking for IT / OT teams</h3></div><BookOpen className="h-7 w-7 text-[#1b7778]" /></div><p className="mt-5 max-w-2xl text-sm leading-7 text-[#50676b]">A practical sequence covering zones, trust boundaries, consequence, vulnerability triage, and how to explain technical risk to the people who own the process.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#c5d6d1] pt-5 font-mono-cnj text-[10px] uppercase tracking-[.08em] text-[#1b7778]"><span>4 modules</span><span>Workshop format</span><span>Team evidence notes</span></div></article><article className="border border-[#a8c8c2] bg-[#173744] p-6 text-[#f6f0df] md:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><p className="eyebrow text-[#61d3c8]">Pathway / certification readiness</p><h3 className="mt-3 font-display text-2xl tracking-[-.05em]">Evidence packs for the exam room</h3></div><FileCheck2 className="h-7 w-7 text-[#f2a65a]" /></div><p className="mt-5 max-w-2xl text-sm leading-7 text-[#c8d7d8]">Preparation support for selected security and industrial-security certification pathways: map the syllabus to your experience, close evidence gaps, and rehearse the competency language.</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#47717b] pt-5 font-mono-cnj text-[10px] uppercase tracking-[.08em] text-[#61d3c8]"><span>Competency map</span><span>Evidence pack</span><span>No certification issued</span></div></article><article className="border border-[#a8c8c2] bg-[#f2f0e8] p-6 md:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><p className="eyebrow text-[#f08b3d]">Pathway / practitioner</p><h3 className="mt-3 font-display text-2xl tracking-[-.05em] text-[#142d3b]">Vulnerability intelligence in practice</h3></div><TerminalSquare className="h-7 w-7 text-[#1b7778]" /></div><p className="mt-5 max-w-2xl text-sm leading-7 text-[#50676b]">Build a repeatable route from NVD, CISA KEV, MITRE ATT&CK, and vendor advisories to asset owners, maintenance windows, compensating controls, and closure evidence.</p></article></div></div></section>

        <section id="compliance" className="bg-[#f8f7f1] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>06 / Compliance coverage</SectionLabel><h2 className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,5vw,5rem)] leading-[.94] tracking-[-.07em] text-[#142d3b]">Map the obligation<br />to <span className="text-[#1b7778]">evidence.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#61777a]">Readiness is a governance and evidence exercise. It is not legal advice, and it is not a certification claim.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{frameworks.map((framework) => { const Icon = framework.icon; return <article key={framework.code} className="border border-[#cedbd9] bg-[#f2f0e8] p-6"><div className="flex items-start justify-between"><span className="font-mono-cnj text-[10px] uppercase tracking-[.15em] text-[#f08b3d]">{framework.code}</span><Icon className="h-6 w-6 stroke-[1.25] text-[#1b7778]" /></div><h3 className="mt-12 font-display text-2xl leading-[.98] tracking-[-.05em] text-[#142d3b]">{framework.title}</h3><p className="mt-4 text-sm leading-7 text-[#61777a]">{framework.copy}</p><a href="#contact" className="focus-ring mt-7 inline-flex items-center gap-2 border-b border-[#1b7778] pb-1 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#1b7778]" data-testid={`link-framework-${framework.code}`}>Discuss evidence <ArrowUpRight className="h-3.5 w-3.5" /></a></article>; })}</div></div></section>

        <section id="intelligence" className="bg-[#f2f0e8] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="grid gap-12 lg:grid-cols-[.42fr_1fr]"><div><SectionLabel>07 / Reference intelligence</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.92] tracking-[-.07em] text-[#142d3b]">Patch the<br /><span className="text-[#f08b3d]">decision.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#61777a]">Example records only — not live API data. Connect your feeds, then map an advisory to the asset, control, framework, and ATT&CK technique it changes.</p><div className="mt-8 flex items-center gap-3 font-mono-cnj text-[10px] uppercase tracking-[.12em] text-[#1b7778]"><Search className="h-4 w-4" /> reference view / local examples</div></div><div><div className="mb-5 flex flex-col gap-3 border-b border-[#cedbd9] pb-5 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Filter by severity</span><select value={vulnerabilitySeverity} onChange={(event) => setVulnerabilitySeverity(event.target.value)} className="focus-ring w-full appearance-none border border-[#b9ceca] bg-[#f8f7f1] px-3 py-2.5 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#142d3b]" data-testid="select-vulnerability-severity"><option>All</option><option>Critical</option><option>High</option><option>Medium</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#1b7778]" /></label><label className="relative flex-1"><span className="sr-only">Filter by status</span><select value={vulnerabilityStatus} onChange={(event) => setVulnerabilityStatus(event.target.value)} className="focus-ring w-full appearance-none border border-[#b9ceca] bg-[#f8f7f1] px-3 py-2.5 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#142d3b]" data-testid="select-vulnerability-status"><option>All</option><option>Triage</option><option>Planned</option><option>Compensating</option><option>Verified</option><option>Accepted</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#1b7778]" /></label></div><div className="overflow-x-auto border border-[#cedbd9] bg-[#f8f7f1]"><table className="w-full min-w-[720px] text-left"><thead className="border-b border-[#cedbd9] bg-[#e7f0ed]"><tr className="font-mono-cnj text-[9px] uppercase tracking-[.1em] text-[#61777a]"><th className="px-4 py-3">Record / asset</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Severity</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Source context</th></tr></thead><tbody>{filteredVulnerabilities.map((record) => <tr key={record.id} className="data-row border-b border-[#cedbd9] last:border-0"><td className="px-4 py-4"><b className="block font-display text-sm font-semibold text-[#142d3b]">{record.id}</b><span className="mt-1 block text-xs text-[#61777a]">{record.asset}</span></td><td className="px-4 py-4 font-mono-cnj text-[10px] text-[#1b7778]">{record.ref}</td><td className="px-4 py-4"><span className={`font-mono-cnj text-[10px] uppercase tracking-[.08em] ${record.severity === 'Critical' ? 'text-[#c45243]' : record.severity === 'High' ? 'text-[#f08b3d]' : 'text-[#1b7778]'}`}>{record.severity}</span></td><td className="px-4 py-4"><span className="inline-flex items-center gap-2 font-mono-cnj text-[10px] uppercase tracking-[.08em] text-[#61777a]"><i className="h-1.5 w-1.5 rounded-full bg-[#1b7778]" />{record.status}</span></td><td className="px-4 py-4 text-xs text-[#61777a]">{record.source}<span className="mt-1 block text-[11px] leading-5 text-[#819897]">{record.note}</span></td></tr>)}</tbody></table>{filteredVulnerabilities.length === 0 && <div className="p-8 text-center text-sm text-[#61777a]">No example records match those filters.</div>}</div><div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{referenceLinks.map(([label, copy, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="focus-ring border border-[#b9ceca] bg-[#e7f0ed] p-4 transition-colors hover:border-[#1b7778]" data-testid={`link-reference-${label.toLowerCase().replaceAll(' ', '-')}`}><div className="flex items-center justify-between font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#1b7778]"><span>{label}</span><ExternalLink className="h-3.5 w-3.5" /></div><p className="mt-3 text-xs leading-5 text-[#61777a]">{copy}</p></a>)}</div></div></div><MappingConsole /></div></section>

        <section id="team" className="bg-[#142d3b] px-6 py-24 text-[#f6f0df] lg:px-10 lg:py-32"><div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[.62fr_1fr] lg:items-end"><div className="relative min-h-[355px] overflow-hidden border border-[#47717b] bg-[#173744] p-7"><div className="absolute right-8 top-8 h-36 w-36 rounded-full border border-[#61d3c8]/30" /><div className="absolute right-16 top-16 h-20 w-20 rounded-full border border-[#61d3c8]/30" /><div className="absolute bottom-8 left-8 h-px w-3/4 bg-[#47717b]" /><div className="absolute bottom-12 left-8 h-24 w-px bg-[#47717b]" /><div className="relative flex min-h-[300px] flex-col justify-between"><div className="flex items-start justify-between"><span className="eyebrow text-[#61d3c8]">The collective / advisory network</span><ShieldAlert className="h-7 w-7 stroke-[1] text-[#f2a65a]" /></div><div><p className="font-display text-5xl font-medium tracking-[-.08em] text-[#f2a65a]">CN</p><p className="mt-2 font-mono-cnj text-[10px] uppercase tracking-[.16em] text-[#b9cbd0]">Our team / systems, risk, learning</p></div></div></div><div><SectionLabel dark>08 / Our team</SectionLabel><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.1rem)] font-medium leading-[.94] tracking-[-.07em]">Experience that<br /><span className="text-[#f2a65a]">crosses boundaries.</span></h2><p className="mt-8 max-w-2xl text-base leading-8 text-[#c8d7d8]">Cyber Njord brings together practitioners who understand security from more than one angle: enterprise architecture, industrial operations, governance, vulnerability intelligence, and the human work of making a decision stick.</p><p className="mt-5 max-w-2xl text-base leading-8 text-[#c8d7d8]">The model is deliberately small and senior. The right specialist joins the problem, the team learns the reasoning, and the evidence stays with the organisation.</p><a href="#contact" className="focus-ring group mt-9 inline-flex items-center gap-3 border-b border-[#f2a65a] pb-2 text-xs font-bold uppercase tracking-[.15em] text-[#f2a65a]" data-testid="link-team-contact">Meet the team in context <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></div></section>

        <section id="contact" className="bg-[#f2f0e8] px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[.75fr_1fr]"><div><div className="line-accent mb-7" /><SectionLabel>09 / Make contact</SectionLabel><h2 className="mt-6 font-display text-[clamp(3rem,6vw,6.4rem)] font-medium leading-[.86] tracking-[-.08em] text-[#142d3b]">Start with<br /><span className="text-[#1b7778]">the situation.</span></h2><p className="mt-8 max-w-md text-base leading-8 text-[#61777a]">You do not need a polished brief. Share what is changing, what feels unclear, or what decision is coming up. Our team will take it from there.</p><div className="mt-10 flex items-center gap-3 font-mono-cnj text-xs text-[#142d3b]"><span className="h-2 w-2 rounded-full bg-[#1b7778]" /> hello@cybernjord.eu</div></div><form onSubmit={handleSubmit} className="border-t-2 border-[#142d3b] pt-7" data-testid="form-contact"><input type="hidden" name="productInterest" value={productInterest} /><div className="grid gap-7 sm:grid-cols-2"><label className="block"><span className="eyebrow text-[#61777a]">Your name</span><input required name="name" type="text" className="focus-ring mt-3 w-full border-b border-[#9fb5b3] bg-transparent px-0 py-3 text-base text-[#142d3b] outline-none transition-colors placeholder:text-[#9fb5b3] focus:border-[#1b7778]" placeholder="Name" data-testid="input-contact-name" /></label><label className="block"><span className="eyebrow text-[#61777a]">Work email</span><input required name="email" type="email" className="focus-ring mt-3 w-full border-b border-[#9fb5b3] bg-transparent px-0 py-3 text-base text-[#142d3b] outline-none transition-colors placeholder:text-[#9fb5b3] focus:border-[#1b7778]" placeholder="you@organisation.eu" data-testid="input-contact-email" /></label></div>{productInterest && <p className="mt-8 border-l-2 border-[#1b7778] pl-4 text-sm text-[#142d3b]" data-testid="text-selected-product">Product to discuss: <strong>{productInterest}</strong></p>}<label className="mt-8 block"><span className="eyebrow text-[#61777a]">What is on your mind?</span><textarea required name="brief" rows={4} className="focus-ring mt-3 w-full resize-none border-b border-[#9fb5b3] bg-transparent px-0 py-3 text-base text-[#142d3b] outline-none transition-colors placeholder:text-[#9fb5b3] focus:border-[#1b7778]" placeholder="A few lines about the environment, the question, or the decision ahead." data-testid="input-contact-brief" /></label><div className="mt-8 flex flex-wrap items-center gap-5"><button type="submit" className="focus-ring group inline-flex items-center gap-3 bg-[#142d3b] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#f6f0df] transition-transform hover:-translate-y-0.5 hover:bg-[#1b7778]" data-testid="button-submit-contact">Send via email <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>{sent && <span className="flex items-center gap-2 text-xs text-[#1b7778]" data-testid="status-contact-sent"><Check className="h-4 w-4" /> Your email draft is ready.</span>}</div><p className="mt-5 text-xs leading-5 text-[#7a8d8d]">This opens your email client with the details you provide. No information is stored on this site.</p></form></div></section>
      </main>

      <footer className="bg-[#142d3b] px-6 py-10 text-[#b9cbd0] lg:px-10"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><Wordmark /><p className="mt-5 max-w-xs text-xs leading-6 text-[#72979e]">Cybersecurity for IT, OT, ICS, cloud access, and the infrastructure that keeps the world moving.</p></div><div className="text-left sm:text-right"><div className="mb-4 flex flex-wrap gap-4 font-mono-cnj text-[10px] uppercase tracking-[.1em] text-[#72979e]"><a href="#compliance" className="focus-ring hover:text-[#f2a65a]" data-testid="link-footer-compliance">Compliance</a><a href="#intelligence" className="focus-ring hover:text-[#f2a65a]" data-testid="link-footer-intelligence">Reference intelligence</a></div><a href="mailto:hello@cybernjord.eu" className="font-mono-cnj text-xs text-[#f2a65a] hover:text-[#ffc47d]" data-testid="link-footer-email">hello@cybernjord.eu</a><p className="mt-3 text-[10px] uppercase tracking-[.14em] text-[#72979e]">© {new Date().getFullYear()} Cyber Njord</p></div></div></footer>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;