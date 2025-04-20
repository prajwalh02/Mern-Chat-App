const MessageSkeleton = () => {
    return (
      <div className="flex flex-col gap-4 px-4 py-2">
        {/* Incoming message skeleton */}
        <div className="flex items-start gap-2">
          <div className="h-10 w-10 rounded-full bg-[#498fb3] opacity-50 blur-[1px] animate-pulse" />
          <div className="flex flex-col gap-2 max-w-[70%]">
            <div className="h-4 w-24 rounded bg-[#498fb3] opacity-50 blur-[1px] animate-pulse" />
            <div className="h-4 w-40 rounded bg-[#498fb3] opacity-50 blur-[1px] animate-pulse" />
          </div>
        </div>
  
        {/* Outgoing message skeleton */}
        <div className="flex justify-end items-start gap-2">
          <div className="flex flex-col gap-2 max-w-[70%] items-end">
            <div className="h-4 w-36 rounded bg-[#498fb3] opacity-50 blur-[1px] animate-pulse" />
            <div className="h-4 w-28 rounded bg-[#498fb3] opacity-50 blur-[1px] animate-pulse" />
          </div>
          <div className="h-10 w-10 rounded-full bg-[#498fb3] opacity-50 blur-[1px] animate-pulse" />
        </div>
      </div>
    );
  };
  
  export default MessageSkeleton;
  