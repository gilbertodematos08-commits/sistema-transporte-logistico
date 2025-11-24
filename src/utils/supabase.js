import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions
export const getMotoristas = async () => {
  const { data, error } = await supabase.from('motoristas').select('*')
  if (error) throw error
  return data
}

export const getVeiculos = async () => {
  const { data, error } = await supabase.from('veiculos').select('*')
  if (error) throw error
  return data
}

export const getViagens = async () => {
  const { data, error } = await supabase
    .from('viagens')
    .select('*, motoristas(*), veiculos(*), clientes(*)')
  if (error) throw error
  return data
}