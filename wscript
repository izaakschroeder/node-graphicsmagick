def set_options(opt):
  opt.tool_options("compiler_cxx")

def configure(conf):
  conf.check_tool("compiler_cxx")
  conf.check_tool("node_addon")

  try:
     conf.check_cfg(package='GraphicsMagick', atleast_version='1.3.12', uselib_store='GRAPHICSMAGICK', args='--cflags --libs', mandatory=True)
  except conf.errors.ConfigurationError:
     conf.check(lib="GraphicsMagick", libpath=['/usr/local/lib', '/opt/local/lib'], uselib_store="GRAPHICSMAGICK", mandatory=True)
    

def build(bld):
  obj = bld.new_task_gen("cxx", "shlib", "node_addon")
  obj.uselib = "GRAPHICSMAGICK"
  obj.cxxflags = [ ]
  obj.target = "GraphicsMagick"
  obj.source = "GraphicsMagick.cc"
  