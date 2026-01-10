import React, { useCallback, useEffect, useMemo, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Mocking external components and hooks based on minified code analysis.
 * In a real scenario, these would be imported from their respective modules.
 */

// Placeholder for cmdk or similar command menu library
const Command: any = ({ children, ...props }: any) => <div {...props}>{children}</div>;
Command.Input = ({ ...props }: any) => <input {...props} />;
Command.List = ({ children, ...props }: any) => <div {...props}>{children}</div>;
Command.Empty = ({ children, ...props }: any) => <div {...props}>{children}</div>;
Command.Loading = ({ children, ...props }: any) => <div {...props}>{children}</div>;

// Mock icons/components
const ArrowLeftIconButton = ({ onClick, className, size }: any) => (
  <button onClick={onClick} className={className}>
    [[SVG:0|PATH:0|NAME:ArrowLeft|DESCRIPTION:Back arrow]]
  </button>
);
const Spinner = ({ size, color, className }: any) => <div className={className}>Loading...</div>;
const WordRotate = ({ words, interval }: any) => <span>{words[0]}</span>;
const XaiLogoIcon = ({ size }: any) => <span>[[SVG:1|PATH:1|NAME:XaiLogo|DESCRIPTION:Xai Logo]]</span>;

// Mock internal sub-components
const FeedbackDisplay = ({ variant, message }: { variant: string; message: string }) => (
  <span>{message}</span>
);

const ActionItem = ({ label, shortcut, onTrigger }: any) => (
  <button onClick={onTrigger} className="flex items-center gap-1">
    <span>{label}</span>
    {shortcut && <kbd>{shortcut.primaryKey}</kbd>}
  </button>
);

const ActionsGroup = ({ actions }: { actions: any[] }) => (
  <div className="flex gap-2">
    {actions.map((action, i) => (
      <ActionItem key={i} {...action} />
    ))}
  </div>
);

// Mock hooks
const useCommandMenu = () => ({
  isOpen: true,
  open: () => {},
  close: () => {},
  isLoading: false,
  goBack: () => {},
  currentPage: { id: "root", searchValue: "", isSearchEnabled: true },
  selectedItem: null,
  selectLabel: "Select",
  feedback: null as { variant: string; message: string } | null,
  itemActions: [] as any[],
  footerActions: [] as any[],
  onSearchChange: (val: string) => {},
  onSelectionChange: (val: string) => {},
});

const useShortcut = (shortcuts: any[]) => {};

export interface CommandMenuProps {
  children?: React.ReactNode;
  width?: number;
  placeholder?: string;
  filter?: (value: string, search: string) => number;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  showFooter?: boolean;
  searchHints?: string[];
  classNames?: {
    container?: string;
    list?: string;
  };
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  children,
  width = 600,
  placeholder = "Type a command or search for help",
  filter,
  emptyState,
  loadingState,
  showFooter,
  searchHints,
  classNames,
}) => {
  const {
    isOpen,
    open,
    close,
    isLoading,
    goBack,
    currentPage,
    selectedItem,
    selectLabel,
    feedback,
    itemActions,
    footerActions,
    onSearchChange,
    onSelectionChange,
  } = useCommandMenu();

  const commandRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "Escape" ||
        (e.key === "Backspace" && !currentPage.searchValue && currentPage.isSearchEnabled)
      ) {
        e.preventDefault();
        goBack();
      }
    },
    [goBack, currentPage.searchValue, currentPage.isSearchEnabled]
  );

  const showSearchHints = useMemo(
    () => !currentPage.searchValue && currentPage.id === "root" && searchHints,
    [currentPage.searchValue, currentPage.id, searchHints]
  );

  useShortcut([
    {
      key: "k",
      modifiers: ["ctrl"],
      onTrigger: () => (isOpen ? close() : open()),
    },
    {
      key: "Escape",
      onTrigger: () => goBack(),
      isEnabled: !currentPage.isSearchEnabled,
    },
  ]);

  useEffect(() => {
    if (!selectedItem || !commandRef.current) return;
    const element = commandRef.current.querySelector(
      `[data-value="${selectedItem}"]`
    ) as HTMLElement;
    if (element) {
      element.scrollIntoView({ block: "nearest", behavior: "auto" });
    }
  }, [selectedItem]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[10000] flex items-end justify-center transition-all",
        "md:items-start md:px-24 md:pt-[min(18dvh,420px)]"
      )}
    >
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/50"
        onClick={close}
      />
      <motion.div
        initial={{ width }}
        exit={{ width }}
        animate={{ width }}
        transition={{ duration: 0.1 }}
        className="max-w-[min(1000px,100%)] w-full"
      >
        <Command
          ref={commandRef}
          label="Command Menu"
          loop
          value={selectedItem}
          onKeyDown={handleKeyDown}
          onValueChange={onSelectionChange}
          filter={filter}
          className={cn(
            "relative flex w-full flex-col overflow-hidden rounded-t-xl border bg-surface-l3/80 shadow-2xl drop-shadow-2xl backdrop-blur-lg focus-visible:outline-none dark:bg-surface-l3/75 md:rounded-xl",
            classNames?.container
          )}
        >
          <div className="relative flex h-12 items-center border-b">
            <AnimatePresence mode="popLayout">
              {currentPage.id !== "root" && (
                <motion.div
                  key="back-arrow"
                  layout
                  initial={{ opacity: 0, translateX: -10 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center pl-3"
                >
                  <ArrowLeftIconButton
                    className="text-subtle hover:text-primary h-8 w-8 transition-colors"
                    size={24}
                    onClick={goBack}
                  />
                </motion.div>
              )}
              <motion.div
                key="search-container"
                layout
                className="relative w-full"
                transition={{ duration: 0.15 }}
              >
                {currentPage.isSearchEnabled && (
                  <Command.Input
                    ref={(el: HTMLInputElement | null) => el?.focus()}
                    placeholder={showSearchHints ? "" : placeholder}
                    value={currentPage.searchValue}
                    className="placeholder:text-subtle w-full bg-transparent p-3 focus-visible:outline-none"
                    onValueChange={onSearchChange}
                  />
                )}
                {showSearchHints && searchHints && (
                  <p className="text-subtle pointer-events-none absolute left-3 top-3">
                    <WordRotate words={searchHints} interval={2500} />
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Spinner
                  size="xs"
                  color="default"
                  className="border-transparent border-b-neutral-400"
                />
              </div>
            )}
          </div>

          <Command.List
            className={cn(
              "command-menu-scrollbar transition-height h-[var(--cmdk-list-height)] max-h-[420px] min-h-[300px] overflow-auto p-3 transition-all duration-500",
              classNames?.list
            )}
            style={{
              scrollPaddingBlockStart: "8px",
              scrollPaddingBlockEnd: "8px",
            }}
          >
            {children}
            {!!emptyState && (
              <Command.Empty className="text-subtle text-sm">
                {emptyState}
              </Command.Empty>
            )}
            {isLoading && loadingState && (
              <Command.Loading className="text-subtle text-sm">
                {loadingState}
              </Command.Loading>
            )}
          </Command.List>

          {showFooter && (
            <div className="border-border flex h-[37px] w-full items-center justify-between gap-3 border-t bg-surface-l2 px-3 py-1">
              <div className="text-subtle flex h-full items-center">
                <AnimatePresence mode="wait">
                  {feedback ? (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <FeedbackDisplay
                        variant={feedback.variant}
                        message={feedback.message}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="xai-logo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <XaiLogoIcon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-end">
                {footerActions?.map((action: any) => (
                  <Fragment key={action.label?.toString()}>
                    <ActionItem {...action} />
                    {((selectLabel && selectedItem) || itemActions.length > 0) && (
                      <div className="bg-border mx-1 h-4 w-[1px]" />
                    )}
                  </Fragment>
                ))}
                {selectLabel && selectedItem && (
                  <ActionItem
                    label={selectLabel}
                    shortcut={{ label: "Enter", primaryKey: "⏎" }}
                    onTrigger={() => {}}
                  />
                )}
                {itemActions.length > 0 && (
                  <Fragment>
                    <div className="bg-border mx-1 h-4 w-[1px]" />
                    <ActionsGroup actions={itemActions} />
                  </Fragment>
                )}
              </div>
            </div>
          )}
        </Command>
      </motion.div>
    </div>
  );
};
