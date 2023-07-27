type CategoryName = "samples" | "vst" | "production";

const channels: Record<
  CategoryName,
  {
    name: string;
    alias: string;
  }
> = {
  samples: {
    name: "סאמפלים",
    alias: "samples",
  },
  vst: {
    name: "VST",
    alias: "vst",
  },
  production: {
    name: "תוכנות הפקה ותקלוט",
    alias: "production",
  },
};

export default channels;
