import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../i18n";
import { CursorArrowIcon, CursorHandIcon } from "./svg-icon";
import "../kanban.css";

// Noms de tâches affichées aléatoirement dans le kanban
const TASK_NAMES = [
  "Aurore Client Mockup",
  "Q3 Invoicing",
  "SaaS Architecture",
  "Kickoff Meeting",
  "API Documentation",
  "Repository Setup",
  "Jest Unit Tests",
  "Staging Deployment",
  "Nova Client Follow-up",
  "Optimization Audit",
];

interface TaskItem {
  id: number;
  name: string;
  status: "todo" | "doing" | "done";
  isArchiving: boolean;
  isFading: boolean;
}

// Carte "fantôme" qui suit le curseur pendant un drag
interface FlyingCard {
  name: string;
  width: number;
  left: number;
  top: number;
}

interface KanbanColumnProps {
  col: "todo" | "doing" | "done";
  title: string;
  emptyMessage: string;
  tasks: TaskItem[];
}

function KanbanColumn({ col, title, emptyMessage, tasks }: KanbanColumnProps) {
  return (
    <div className="kanban-column" data-col={col}>
      <div className="kanban-column-header">
        <span className="kanban-column-title">{title}</span>
        <span className="kanban-column-count">{tasks.filter((t) => !t.isArchiving).length}</span>
      </div>
      <div className="kanban-cards">
        {tasks.length === 0 && <div className="kanban-empty-placeholder">{emptyMessage}</div>}
        {tasks.map((task) => (
          <div
            key={task.id}
            data-task-id={task.id}
            className={`kanban-task ${task.isArchiving ? (task.isFading ? "archiving-fade" : "archiving") : ""}`}
          >
            <span className="label">{task.name}</span>
            <span className="meta">a few seconds ago</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface KanbanDemoProps {
  className?: string;
}

export default function KanbanDemo({ className }: KanbanDemoProps) {
  const { t } = useTranslation();
  // mounted = true uniquement côté client (évite le mismatch SSR)
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [flyingCard, setFlyingCard] = useState<FlyingCard | null>(null);
  const flyingCardRef = useRef<HTMLDivElement>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // État mutable pour l'animation (évite les re-renders inutiles)
  const stateRef = useRef({
    idSeq: 0,
    isDragging: false,
    currentCursorX: 0,
    currentCursorY: 0,
  });

  // Ref des tâches pour lecture synchrone dans les callbacks d'animation
  const tasksRef = useRef<TaskItem[]>([]);
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  // Marque le composant comme monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Moteur d'animation ( tourne une seule fois après montage ) ───
  useEffect(() => {
    if (!mounted || !boardRef.current || !cursorRef.current) return;

    const cursorEl = cursorRef.current;
    const state = stateRef.current;

    // Position initiale du curseur animé (point de départ naturel dans le board)
    const rect = boardRef.current.getBoundingClientRect();
    state.currentCursorX = rect.left + rect.width * 0.35;
    state.currentCursorY = rect.top + rect.height * 0.4;

    cursorEl.classList.add("visible");

    // ── Helpers curseur ──
    function setCursorState(type: "arrow" | "hand" | "grabbing") {
      cursorEl.classList.remove("state-arrow", "state-hand", "grabbing");
      if (type === "hand") cursorEl.classList.add("state-hand");
      else if (type === "grabbing") cursorEl.classList.add("state-hand", "grabbing");
      else cursorEl.classList.add("state-arrow");
    }

    setCursorState("arrow");

    function setCursorPos(x: number, y: number) {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Clamp within board bounds
      const clampedX = Math.max(rect.left, Math.min(x, rect.right - 24));
      const clampedY = Math.max(rect.top, Math.min(y, rect.bottom - 24));
      const isVisible =
        x >= rect.left - 10 && x <= rect.right + 10 && y >= rect.top - 10 && y <= rect.bottom + 10;
      if (isVisible) {
        cursorEl.classList.add("visible");
      } else {
        cursorEl.classList.remove("visible");
      }
      // Convert to board-relative coordinates for absolute positioning
      const relX = clampedX - rect.left;
      const relY = clampedY - rect.top;
      cursorEl.style.left = `${relX}px`;
      cursorEl.style.top = `${relY}px`;
      state.currentCursorX = x;
      state.currentCursorY = y;
    }

    setCursorPos(state.currentCursorX, state.currentCursorY);

    // ── Génération de tâche (max 4 actives) ──
    function spawnTask(status: "todo" | "doing" = "todo") {
      const activeCount = tasksRef.current.filter((t) => !t.isArchiving).length;
      if (activeCount >= 4) return;

      stateRef.current.idSeq++;
      const newTask: TaskItem = {
        id: stateRef.current.idSeq,
        name: TASK_NAMES[Math.floor(Math.random() * TASK_NAMES.length)],
        status,
        isArchiving: false,
        isFading: false,
      };

      setTasks((prev) => [...prev, newTask]);
    }

    // ── Animation courbe de Bézier ( curseur + carte volante ) ──
    function animateAlongCurve(
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      duration: number,
      isDraggingCard: boolean,
      dragOffsetX: number,
      dragOffsetY: number,
      onComplete: () => void,
    ) {
      const startTime = performance.now();
      const dx = endX - startX;
      const dy = endY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const offset = dist * 0.12;
      const px = -dy / dist;
      const py = dx / dist;
      const ctrlX = (startX + endX) / 2 + px * offset;
      const ctrlY = (startY + endY) / 2 + py * offset - 12;

      function updateFlyingCard(x: number, y: number) {
        if (!isDraggingCard || !flyingCardRef.current) return;
        const rect = boardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const inBounds = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
        flyingCardRef.current.style.opacity = inBounds ? "0.97" : "0";
        // Convert to board-relative coordinates
        const relX = x + dragOffsetX - rect.left;
        const relY = y + dragOffsetY - rect.top;
        flyingCardRef.current.style.left = `${relX}px`;
        flyingCardRef.current.style.top = `${relY}px`;
      }

      function frame(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const t = progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2;
        const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
        const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

        setCursorPos(x, y);
        updateFlyingCard(x, y);

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          onComplete();
        }
      }
      requestAnimationFrame(frame);
    }

    // ── Drag complet : curseur → carte → lâcher dans la colonne cible ──
    function dragTaskTo(taskId: number, nextStatus: "doing" | "done", onDone?: () => void) {
      if (state.isDragging) return;
      state.isDragging = true;

      const el = boardRef.current?.querySelector(`[data-task-id="${taskId}"]`) as HTMLElement;
      if (!el) {
        state.isDragging = false;
        return;
      }

      const targetColEl = boardRef.current?.querySelector(
        `[data-col="${nextStatus}"] .kanban-cards`,
      ) as HTMLElement;
      const startRect = el.getBoundingClientRect();
      const targetRect = targetColEl.getBoundingClientRect();

      const humanOffsetX = 18;
      const humanOffsetY = 12;
      const targetCursorStartX = startRect.left + startRect.width - humanOffsetX;
      const targetCursorStartY = startRect.top + humanOffsetY;

      setCursorState("arrow");
      cursorEl.classList.add("visible");

      // Étape 1 : le curseur se déplace vers la carte cible
      animateAlongCurve(
        state.currentCursorX,
        state.currentCursorY,
        targetCursorStartX,
        targetCursorStartY,
        160,
        false,
        0,
        0,
        () => {
          setCursorState("hand");

          setCursorState("grabbing");

          // La carte originale est marquée "archiving" (invisible), le clone volant apparaît
          setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, isArchiving: true } : t)));
          setFlyingCard({
            name: el.querySelector(".label")?.textContent || "",
            width: startRect.width,
            left: startRect.left,
            top: startRect.top,
          });

          const dragOffsetX = startRect.left - targetCursorStartX;
          const dragOffsetY = startRect.top - targetCursorStartY;

          // Position de dépôt dans la colonne cible
          const dropX = targetRect.left + 12;
          const dropY =
            targetRect.top +
            12 +
            targetColEl.querySelectorAll(".kanban-task:not(.archiving)").length * 6 -
            targetColEl.scrollTop;
          const targetCursorEndX = dropX + startRect.width - humanOffsetX;
          const targetCursorEndY = dropY + humanOffsetY;

          // Étape 2 : le curseur + clone volent vers la colonne cible
          animateAlongCurve(
            targetCursorStartX,
            targetCursorStartY,
            targetCursorEndX,
            targetCursorEndY,
            220,
            true,
            dragOffsetX,
            dragOffsetY,
            () => {
              // Le clone disparaît, la tâche réapparaît dans la nouvelle colonne
              setFlyingCard(null);
              setTasks((prev) =>
                prev.map((t) =>
                  t.id === taskId ? { ...t, status: nextStatus, isArchiving: false } : t,
                ),
              );

              setCursorState("arrow");
              cursorEl.classList.remove("visible");
              state.isDragging = false;
              if (onDone) onDone();
            },
          );
        },
      );
    }

    // ── Logique d'avancement automatique des tâches ──
    function archiveTask(target: { id: number }) {
      setTasks((prev) => prev.map((t) => (t.id === target.id ? { ...t, isArchiving: true } : t)));
      setTimeout(() => {
        setTasks((prev) => prev.map((t) => (t.id === target.id ? { ...t, isFading: true } : t)));
      }, 200);
      setTimeout(() => {
        setTasks((prev) => prev.filter((t) => t.id !== target.id));
      }, 500);
    }

    function getActiveTasks() {
      return tasksRef.current.filter((t) => !t.isArchiving);
    }

    function advanceOneTask() {
      if (state.isDragging) return;
      const activeTasks = getActiveTasks();
      if (tryArchiveDone(activeTasks)) return;
      if (advanceDoingToDone(activeTasks)) return;
      if (advanceTodoToDoing(activeTasks)) return;
      if (activeTasks.length < 4) spawnTask();
    }

    function tryArchiveDone(activeTasks: { id: number; status: string }[]) {
      const doneTasks = activeTasks.filter((t) => t.status === "done");
      if (doneTasks.length === 0 || Math.random() >= 0.6) return false;
      archiveTask(doneTasks[0]);
      return true;
    }

    function advanceTodoToDoing(activeTasks: { id: number; status: string }[]) {
      const todoTasks = activeTasks.filter((t) => t.status === "todo");
      if (todoTasks.length === 0) return false;
      dragTaskTo(todoTasks[0].id, "doing");
      return true;
    }

    function advanceDoingToDone(activeTasks: { id: number; status: string }[]) {
      const doingTasks = activeTasks.filter((t) => t.status === "doing");
      if (doingTasks.length === 0) return false;
      const target = doingTasks[Math.floor(Math.random() * doingTasks.length)];
      dragTaskTo(target.id, "done", () => archiveTask(target));
      return true;
    }

    // Change aléatoirement l'icône du curseur (flèche/main) entre chaque tick
    const handleMoveCheck = () => {
      if (!state.isDragging) {
        const activeCount = tasksRef.current.filter((t) => !t.isArchiving).length;
        if (activeCount > 0 && Math.random() < 0.4) {
          setCursorState("hand");
        } else {
          setCursorState("arrow");
        }
      }
    };

    spawnTask("todo");
    spawnTask("todo");
    spawnTask("doing");

    // Premier mouvement : aller chercher la tâche dans "In Progress" et la déplacer vers "Done"
    setTimeout(() => {
      const doingTask = tasksRef.current.find((t) => t.status === "doing" && !t.isArchiving);
      if (doingTask) {
        dragTaskTo(doingTask.id, "done");
      }
    }, 500);

    // Boucle principale : spawn ou avance une tâche toutes les 1100ms
    const intervalId = setInterval(() => {
      handleMoveCheck();
      const activeCount = tasksRef.current.filter((t) => !t.isArchiving).length;

      if (activeCount < 4 && Math.random() < 0.35) {
        spawnTask("todo");
      } else {
        advanceOneTask();
      }
    }, 1100);

    return () => clearInterval(intervalId);
  }, [mounted]);

  const todoList = tasks.filter((t) => t.status === "todo");
  const doingList = tasks.filter((t) => t.status === "doing");
  const doneList = tasks.filter((t) => t.status === "done");

  return (
    <div className={className}>
      <div className="kanban-window" ref={boardRef}>
        <div className="kanban-titlebar">
          <div className="kanban-dot r" />
          <div className="kanban-dot y" />
          <div className="kanban-dot g" />
          <span>NuxiPro</span>
        </div>
        <div className="kanban-board">
          <KanbanColumn col="todo" title="To Do" emptyMessage="Ready to start?" tasks={todoList} />
          <KanbanColumn
            col="doing"
            title="In Progress"
            emptyMessage="Nothing in progress"
            tasks={doingList}
          />
          <KanbanColumn col="done" title="Done" emptyMessage="Drop a task here" tasks={doneList} />
        </div>
        <div className="kanban-footer-note">
          <span>
            Demo mode: tasks archive instantly when moved to Done. Data stays in your browser.
          </span>
        </div>

        {/* Carte volante rendue en absolute dans le board */}
        {mounted && flyingCard && (
          <div
            ref={flyingCardRef}
            className="kanban-task dragging"
            style={{
              position: "absolute",
              width: `${flyingCard.width}px`,
              left: `${flyingCard.left}px`,
              top: `${flyingCard.top}px`,
              transition: "none",
              zIndex: 100,
            }}
          >
            <span className="label">{flyingCard.name}</span>
            <span className="meta">a few seconds ago</span>
          </div>
        )}

        {/* Curseur animé rendu en absolute dans le board */}
        {mounted && (
          <div className="kanban-cursor" ref={cursorRef}>
            <CursorArrowIcon />
            <CursorHandIcon />
          </div>
        )}
      </div>
    </div>
  );
}
