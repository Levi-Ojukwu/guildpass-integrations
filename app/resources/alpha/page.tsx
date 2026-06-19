"use client"
import { Gated } from "@/components/gated"
import { FeatureGate } from "@/components/feature-gate"
import { features } from "@/lib/features"

export default function AlphaDocs() {
  return (
    <FeatureGate enabled={features.resources} name="Resources">
      <Gated minTier="standard">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Alpha Docs</h1>
          <p className="text-muted-foreground">This page is gated at Standard tier and above.</p>
          <div className="rounded-md border p-4">
            <div className="text-sm">Gated content section placeholder.</div>
          </div>
        </div>
      </Gated>
    </FeatureGate>
  )
}
