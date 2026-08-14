import type { Post } from '../types/post';

/** Static published notes (shown alongside Supabase posts). */
export const STATIC_POSTS: Post[] = [
  {
    id: 'static-os-process-scheduling',
    title: 'Process scheduling: what the OS is actually deciding',
    excerpt:
      'A straight pass through what a scheduler does — ready queues, preemption, and why “my process is slow” is often a scheduling story, not a CPU story.',
    category: 'systems',
    status: 'published',
    created_at: '2026-08-14T00:00:00.000Z',
    updated_at: '2026-08-14T00:00:00.000Z',
    content: `
<p>When people say “the OS runs my program,” they usually mean the scheduler. Your code does not own the CPU. It gets slices of time, and the kernel decides who gets the next one.</p>

<p>At a high level, a process (or thread) sits in a small set of states: <strong>running</strong> on a core, <strong>ready</strong> waiting for a core, or <strong>blocked</strong> waiting on I/O, a lock, a timer, or some other event. Scheduling is the policy that picks the next ready process when a core becomes free — or when the current one has used up its turn.</p>

<h2>What the scheduler is optimizing for</h2>

<p>There is no single “correct” scheduler. Different goals fight each other:</p>
<ul>
  <li><strong>Throughput</strong> — finish more work per unit time.</li>
  <li><strong>Latency / response time</strong> — make interactive work feel snappy.</li>
  <li><strong>Fairness</strong> — don’t starve anyone forever.</li>
  <li><strong>Utilization</strong> — keep cores busy when there is ready work.</li>
</ul>
<p>A batch job and a text editor want different things. The OS has to encode that somehow — priorities, nice values, realtime classes, or multi-level feedback queues that promote interactive work and demote CPU hogs.</p>

<h2>Preemption is the interesting part</h2>

<p>In a cooperative world, a process runs until it yields. Modern general-purpose systems are mostly <strong>preemptive</strong>: a timer interrupt fires, the kernel runs, and it may switch you out mid-thought. That single idea is why “I wrote a tight loop” can freeze a machine without preemption, and why with preemption it usually only makes <em>your</em> process slow while others still get airtime.</p>

<p>A context switch is not free. The kernel saves registers, may switch address spaces, warms caches for the next process, and resumes. Too much switching wastes cycles; too little switching makes the system feel stuck. Time slices and priorities are knobs on that tradeoff.</p>

<h2>I/O-bound vs CPU-bound</h2>

<p>This is the part that changed how I debug “slow.”</p>
<p>A <strong>CPU-bound</strong> process wants the core. A <strong>I/O-bound</strong> process spends most of its life blocked — waiting on disk, network, or a mutex. Schedulers often favor processes that block often: when they wake up, give them the CPU quickly so they can issue the next I/O and go back to sleep. That improves interactive feel without hurting long-running compute as much as you’d think.</p>
<p>So when something feels stuck, ask: is it not getting scheduled, or is it scheduled but blocked? Those are different bugs. One is a priority / contention / runaway-neighbor problem. The other is waiting on a resource you haven’t instrumented yet.</p>

<h2>Why this matters when you build systems</h2>

<p>You don’t need to implement CFS to ship an API. You do need the model:</p>
<ul>
  <li>Concurrency is not unlimited parallelism — ready work queues behind finite cores.</li>
  <li>“Slow” might mean starved, blocked, or thrashing under too many runnable threads.</li>
  <li>Thread pools, worker counts, and async I/O are application-level answers to the same question the OS already answers: <em>who runs next, and who waits?</em></li>
</ul>
<p>Once that clicks, a lot of backend tuning stops feeling like folklore and starts feeling like scheduling with extra steps.</p>
`.trim(),
  },
];
