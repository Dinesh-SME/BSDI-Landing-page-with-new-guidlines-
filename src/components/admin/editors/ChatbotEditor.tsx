import React from 'react';
import { useContentStore } from '@/stores/contentStore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Shield, Palette, Layout, Save, Info, Plus, X } from 'lucide-react';
import { BilingualField } from '../BilingualField';

export default function ChatbotEditor() {
  const { chatbot, updateChatbot } = useContentStore();

  const handleUpdate = (field: string, value: any) => {
    updateChatbot({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
        <div className="flex items-center gap-3 mb-2">
          <Bot className="text-primary" size={24} />
          <h2 className="text-lg font-bold text-primary">Chatbot Settings</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Manage your AI assistant's personality, visibility, and knowledge constraints. 
          The assistant is tuned to prioritize Bahrain's infrastructure data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Configuration */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Layout size={18} className="text-primary" />
                Visibility & Identity
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="bot-enabled" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Enabled</Label>
                <Switch 
                  id="bot-enabled" 
                  checked={chatbot.enabled} 
                  onCheckedChange={(val) => handleUpdate('enabled', val)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <BilingualField
                  label="Assistant Name"
                  value={chatbot.assistantName}
                  valueAr={chatbot.assistantName_ar || ''}
                  onChange={(val) => handleUpdate('assistantName', val)}
                  onChangeAr={(val) => handleUpdate('assistantName_ar', val)}
                  placeholder="e.g. BSDI AI"
                />
              </div>

              <div>
                <BilingualField
                  label="Welcome Message"
                  value={chatbot.welcomeMessage}
                  valueAr={chatbot.welcomeMessage_ar || ''}
                  onChange={(val) => handleUpdate('welcomeMessage', val)}
                  onChangeAr={(val) => handleUpdate('welcomeMessage_ar', val)}
                  multiline
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-6">
              <Palette size={18} className="text-primary" />
              Theme & Style
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Primary Theme Color</Label>
              <div className="flex gap-3 items-center">
                <input 
                  type="color" 
                  value={chatbot.themeColor} 
                  onChange={(e) => handleUpdate('themeColor', e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <code className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">{chatbot.themeColor}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge & Constraints */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-6">
              <Shield size={18} className="text-primary" />
              Restrictions & Keywords
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Restricted Keywords</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {chatbot.restrictedKeywords.map((kw, i) => (
                    <div key={i} className="flex items-center gap-1 bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded-lg border border-red-100">
                      {kw}
                      <button onClick={() => {
                        const newKws = chatbot.restrictedKeywords.filter((_, idx) => idx !== i);
                        handleUpdate('restrictedKeywords', newKws);
                      }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add keyword..." 
                    className="h-9 text-xs" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        if (val) {
                          handleUpdate('restrictedKeywords', [...chatbot.restrictedKeywords, val]);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <Button size="sm" variant="outline"><Plus size={14} /></Button>
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {chatbot.categories.map((cat, i) => (
                    <div key={i} className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-lg">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-800 mb-6">
              <MessageSquare size={18} className="text-primary" />
              Quick Suggestion Chips
            </div>
            <div className="space-y-4">
               <BilingualField
                label="Suggestion Chips"
                value={chatbot.suggestionChips.join(', ')}
                valueAr={chatbot.suggestionChips_ar?.join(', ') || ''}
                onChange={(val) => handleUpdate('suggestionChips', val.split(',').map(s => s.trim()))}
                onChangeAr={(val) => handleUpdate('suggestionChips_ar', val.split(',').map(s => s.trim()))}
                placeholder="Roads, GIS, Infrastructure (comma separated)"
                multiline
              />
              <p className="text-[10px] text-muted-foreground italic">
                * Enter chips separated by commas. These will appear as clickable suggestions for users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield size={18} className="text-accent" />
          Analytics & Engagement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Conversations</div>
            <div className="text-2xl font-display font-bold text-primary">1,284</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg. Response Time</div>
            <div className="text-2xl font-display font-bold text-primary">1.2s</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Satisfaction Rate</div>
            <div className="text-2xl font-display font-bold text-accent">98.4%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
